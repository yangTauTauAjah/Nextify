import { Box, Stack, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import Song from "./Track";
import {
  setCollection,
  setNowPlaying,
  setPlayingOrder
} from "@/components/stateSlice/SpotifyAPI";
import { AlbumObject, PlaylistObject } from "@/components/interfaces";
import { MoreHoriz, PlayCircle } from "@mui/icons-material";

const Tracks = ({
  collection,
  sx
}: {
  collection: PlaylistObject | AlbumObject;
  sx?: any;
}) => {
  const Theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Stack sx={sx} gap={2}>
      <Box
        sx={{
          display: "none",
          marginBottom: '1rem',
          gap: "1rem",
          alignItems: "center",
          [Theme.breakpoints.up("sm")]: {
            display: "flex"
          }
        }}>
        <PlayCircle
          className="cursor-pointer"
          sx={{
            fontSize: "4rem",
            color: ({ palette }) => palette.primary.main
          }}
        />
        <MoreHoriz className="white-hover" sx={{ fontSize: "2rem" }} />
      </Box>
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
