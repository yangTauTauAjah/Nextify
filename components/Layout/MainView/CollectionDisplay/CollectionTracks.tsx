import { RootState } from "@/components/store";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Song, { SongComponentInterface } from "./Track";
import {
  AlbumObject,
  ArtistObject,
  CollectionType,
  ComponentTypeInterface,
  PlaylistItems,
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";

const Tracks = ({ type = "playlist", sx }: {type?: CollectionType, sx?: any}) => {
  let collection = useSelector((state: RootState) => state.data[type]) as
    | PlaylistObject
    | AlbumObject
    | TrackObject
    | undefined;

  let data: SongComponentInterface[] = [];

  if (type === "album") {
    (collection as AlbumObject | undefined)?.tracks.items.map((e) => {
      const { id, name, artists } = e;
      data.push({ id, name, artists });
    });
  } else {
    (collection as PlaylistObject | undefined)?.tracks.items.forEach((e) => {
      const {
        track: { id, name, album, artists, explicit }
      } = e;
      data.push({ id, name, album, artists, explicit });
    });
  }

  return (
    <Stack sx={sx} gap={2}>
      {data.map(({ id, name, album, artists, explicit }) => (
        <Song
          key={id}
          id={id}
          name={name}
          artists={artists}
          album={album}
          explicit={explicit}
        />
      ))}
    </Stack>
  );
};

export default Tracks;
