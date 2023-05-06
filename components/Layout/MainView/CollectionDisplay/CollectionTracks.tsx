import { RootState } from "@/components/store";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Song, { SongComponentInterface } from "./Track";
import {
  setCollection,
  setNowPlaying,
  setPlayingOrder
} from "@/components/stateSlice/SpotifyAPI";
import { AlbumObject, PlaylistObject } from "@/components/interfaces";

const Tracks = ({
  collection,
  sx
}: {
  collection: PlaylistObject | AlbumObject;
  sx?: any;
}) => {
  // let collection = useSelector((state: RootState) => state.data.collection);
  const dispatch = useDispatch();

  // let data: SongComponentInterface[] = [];

  /* if (collection?.type === "album") {
    collection?.tracks.items.map((e) => {
      const { id, name, artists, album, explicit, duration_ms } = e;
      data.push({ id, name, artists, album, explicit, duration_ms });
    });
  } else if (collection?.type === "playlist") {
    collection?.tracks.items.forEach((e) => {
      const { id, name, album, artists, explicit, duration_ms } = e.track;
      data.push({ id, name, album, artists, explicit, duration_ms });
    });
  } */

  return (
    <Stack sx={sx} gap={2}>
      {collection.type === "album"
        ? collection.tracks.items.map(
            ({ album, artists, duration_ms, explicit, id, name }, i) => {
              return (
                <Song
                  key={id}
                  id={id}
                  name={name}
                  artists={artists}
                  album={album}
                  onClick={() => {
                    dispatch(
                      setNowPlaying({
                        album,
                        artists,
                        duration_ms,
                        explicit,
                        id,
                        name
                      })
                    );
                    dispatch(setCollection(collection));
                    dispatch(setPlayingOrder(i));
                  }}
                  duration_ms={duration_ms}
                  explicit={explicit}
                />
              );
            }
          )
        : collection.tracks.items.map(
            (
              { track: { album, artists, duration_ms, explicit, id, name } },
              i
            ) => {
              return (
                <Song
                  key={id}
                  id={id}
                  name={name}
                  artists={artists}
                  album={album}
                  onClick={() => {
                    dispatch(
                      setNowPlaying({
                        album,
                        artists,
                        duration_ms,
                        explicit,
                        id,
                        name
                      })
                    );
                    dispatch(setCollection(collection));
                    dispatch(setPlayingOrder(i));
                  }}
                  duration_ms={duration_ms}
                  explicit={explicit}
                />
              );
            }
          )}
    </Stack>
  );
};

export default Tracks;
