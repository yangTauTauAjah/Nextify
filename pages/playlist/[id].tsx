import { getPlaylist } from "@/components/request";
import { PlaylistObject } from "@/components/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import { GET_PLAYLIST } from "@/components/fields";
import FilterComponent from "@/components/Layout/MainView/CollectionDisplay/FilterComponent";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

export const getServerSideProps: GetServerSideProps<PlaylistObject> = async ({
  params
}) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getPlaylist(params.id, GET_PLAYLIST);
    if (data) return { props: data };
  }
  return { notFound: true };
};

export default function Id(PlaylistObject: PlaylistObject) {
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCollection(PlaylistObject));
  }, [PlaylistObject, dispatch]); */

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <FilterComponent />
      <PlaylistThumbnail collection={PlaylistObject} />
      <PlaylistMetadata collection={PlaylistObject}  />
      <Tracks collection={PlaylistObject} />
    </Stack>
  );
}
