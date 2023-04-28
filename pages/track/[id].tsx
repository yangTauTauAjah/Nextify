import {
  getArtistTopTrack,
  getTrack
} from "@/components/stateSlice/SpotifyAPI";
import {
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTrack } from "@/components/stateSlice/SpotifyAPI/data";
import CollectionThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import CollectionMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

export interface TrackCollectionInterface {
  trackData: TrackObject;
  topTrackByArtist: TrackObject[];
}

export const getServerSideProps: GetServerSideProps<
  PlaylistObject | {}
> = async ({ params, query }) => {
  if (params?.id && !(params.id instanceof Array)) {

    const {
      name,
      artists: [artist],
      album
    }: TrackObject = await getTrack(params.id);

    const tracks = await getArtistTopTrack(
      artist.id,
      (query?.locale as string) || "US"
    );

    const props: PlaylistObject = {
      type: "playlist",
      name,
      description: "",
      owner: {
        id: artist.id,
        display_name: artist.name,
        images: artist.images,
        type: "user"
      },
      images: album.images,
      tracks: {
        items: tracks.map((e) => ({
          track: {
            id: e.id,
            name: e.name,
            album: e.album,
            artists: e.artists,
            duration_ms: e.duration_ms,
            explicit: e.explicit
          }
        }))
      }
    };

    return { props };
  } else return { notFound: true };
};

export default function Id(data: PlaylistObject) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTrack(data));
  }, [data, dispatch]);

  return (
    <Stack gap={3} sx={{ padding: "2rem 1rem" }}>
      <CollectionThumbnail type="track" />
      <CollectionMetadata type="track" />
      <Tracks type="track" />
    </Stack>
  );
}
