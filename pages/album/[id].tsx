import { getAlbum } from "@/components/request";
import { AlbumObject } from "@/components/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

export const getServerSideProps: GetServerSideProps<AlbumObject> = async ({
  params
}) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getAlbum(params.id);
    if (data) return { props: data };
  }
  
  return { notFound: true };
};

export default function Id(AlbumObject: AlbumObject) {
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCollection(AlbumObject));
  }, [AlbumObject, dispatch]); */

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <PlaylistThumbnail collection={AlbumObject} />
      <PlaylistMetadata collection={AlbumObject} />
      <Tracks collection={AlbumObject} />
    </Stack>
  );
}
