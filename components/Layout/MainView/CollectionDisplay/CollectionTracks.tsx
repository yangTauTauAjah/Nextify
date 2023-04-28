import { RootState } from "@/components/store";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Song from "./Track";
import {
  AlbumObject,
  CollectionType,
  ComponentTypeInterface,
  PlaylistItems,
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";

const Tracks = ({ type = "playlist" }: ComponentTypeInterface) => {
  let collection = useSelector((state: RootState) => state.data[type]) as
    | AlbumObject
    | PlaylistObject
    | undefined;
  return (
    <Stack gap={2}>
      {collection?.tracks.items.map((track) => {
        return type === "playlist" ? (
          <Song
            key={(track as PlaylistItems).track.id}
            track={(track as PlaylistItems).track}
          />
        ) : (
          <Song key={(track as TrackObject).id} track={track as TrackObject} />
        );
      })}
    </Stack>
  );
};

export default Tracks;
