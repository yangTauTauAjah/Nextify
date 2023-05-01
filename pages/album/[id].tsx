import { getAlbum } from "@/components/stateSlice/SpotifyAPI";
import { AlbumObject } from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAlbum } from "@/components/stateSlice/SpotifyAPI/data";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

export const getServerSideProps: GetServerSideProps<AlbumObject | {}> = async ({
  params
}) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getAlbum(params.id);
    return { props: data };
  } else return { notFound: true };
};

export default function Id(AlbumObject: AlbumObject) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAlbum(AlbumObject));
  }, [AlbumObject, dispatch]);

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <PlaylistThumbnail type="album" />
      <PlaylistMetadata type="album" />
      <Tracks type="album" />
    </Stack>
  );
}
