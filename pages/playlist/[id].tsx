import { getPlaylist } from "@/components/stateSlice/SpotifyAPI";
import { PlaylistObject } from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import { GET_PLAYLIST } from "@/components/stateSlice/SpotifyAPI/fields";
import FilterComponent from "@/components/Layout/MainView/CollectionDisplay/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPlaylist } from "@/components/stateSlice/SpotifyAPI/data";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

export const getServerSideProps: GetServerSideProps<
  PlaylistObject | {}
> = async ({ params }) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getPlaylist(params.id, GET_PLAYLIST);
    return { props: data };
  } else return { notFound: true };
};

export default function Id(PlaylistObject: PlaylistObject) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPlaylist(PlaylistObject));
  }, [PlaylistObject, dispatch]);

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <FilterComponent />
      <PlaylistThumbnail/>
      <PlaylistMetadata/>
      <Tracks/>
    </Stack>
  );
}
