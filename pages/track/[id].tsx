import {
  getArtistTopTrack,
  getTrack
} from "@/components/request";
import {
  PlaylistObject,
  TrackObject
} from "@/components/interfaces";
import { GetServerSideProps } from "next";
import { Box, Stack } from "@mui/material";
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
  if (params?.id && !(params.id instanceof Array)) {
    const track = await getTrack(params.id);

    if (!track) return { notFound: true };

    const {
      id,
      name,
      artists: [artist],
      album
    } = track;

    if (!(query["locale"] instanceof Array)) {
      const tracks = await getArtistTopTrack(
        artist.id,
        query["locale"] || "US"
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
    }
  }
  
  return { notFound: true };
};

export default function Id(data: PlaylistObject) {
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCollection(data));
  }, [data, dispatch]); */

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <CollectionThumbnail collection={data} />
      <CollectionMetadata collection={data} />
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
        <Tracks collection={data} sx={{ marginTop: "2rem" }} />
      </section>
    </Stack>
  );
}
