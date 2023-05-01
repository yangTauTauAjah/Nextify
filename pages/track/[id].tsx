import {
  getArtistTopTrack,
  getTrack
} from "@/components/stateSlice/SpotifyAPI";
import {
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import { Box, Stack } from "@mui/material";
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

export const getServerSideProps: GetServerSideProps<PlaylistObject> = async ({
  params,
  query
}) => {
  if (!params?.id || params.id instanceof Array) return { notFound: true };

  const track = await getTrack(params.id);

  if (!track) return { notFound: true };

  const {
    id,
    name,
    artists: [artist],
    album
  } = track;

  const tracks = await getArtistTopTrack(
    artist.id,
    (query?.locale as string) || "US"
  );

  if (!tracks) return { notFound: true };

  const props: PlaylistObject = {
    type: "playlist",
    id,
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
};

export default function Id(data: PlaylistObject) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTrack(data));
  }, [data, dispatch]);

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <CollectionThumbnail type="track" />
      <CollectionMetadata type="track" />
      <section>
        <div>
          <Box
            component="p"
            sx={{ color: ({ typography }) => typography.subtitle1.color }}>
            Popular Tracks by
          </Box>
        </div>
        <h1 style={{ marginBlock: "0.7rem", fontSize: "1.7rem" }}>
          {data.owner.display_name}
        </h1>
        <Tracks sx={{ marginTop: "2rem" }} type="track" />
      </section>
    </Stack>
  );
}
