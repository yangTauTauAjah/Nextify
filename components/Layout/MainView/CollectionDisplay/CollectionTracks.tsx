import { RootState } from "@/components/store";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Song from "./Track";
import {
  AlbumObject,
  CollectionType,
  PlaylistItems,
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";

const Tracks = ({ type = "playlist" }: { type?: CollectionType }) => {
  let collection = useSelector((state: RootState) => state.data[type]) as
    | AlbumObject
    | PlaylistObject
    | undefined;
  return (
    <Stack gap={2}>
      {collection?.tracks.items.map((track) => {
        return (
          <Song
            key={
              type === "playlist"
                ? (track as PlaylistItems).track.id
                : (track as TrackObject).id
            }
            track={
              type === "playlist"
                ? (track as PlaylistItems).track
                : (track as TrackObject)
            }
          />
        );
      })}
    </Stack>
  );
};

export default Tracks;
