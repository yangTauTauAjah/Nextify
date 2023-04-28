import {
  getAlbum,
  getArtist,
  getArtistAlbum,
  getArtistTopTrack,
  getPlaylist,
  getRelatedArtist
} from "@/components/stateSlice/SpotifyAPI";
import {
  AlbumObject,
  ArtistObject,
  PlaylistObject,
  TrackObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import { Stack } from "@mui/material";
import { GET_PLAYLIST } from "@/components/stateSlice/SpotifyAPI/fields";
import FilterComponent from "@/components/Layout/MainView/CollectionDisplay/FilterComponent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPlaylist } from "@/components/stateSlice/SpotifyAPI/data";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";

interface ArtistDataInterface {
  artist: ArtistObject;
  albums: AlbumObject[];
  top_tracks: TrackObject[];
  related_artist: ArtistObject[];
}

export const getServerSideProps: GetServerSideProps<
  ArtistDataInterface | {}
> = async ({ params, query }) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data: ArtistDataInterface = {
      artist: (await getArtist([params.id]))[0],
      albums: await getArtistAlbum(params.id),
      related_artist: await getRelatedArtist(params.id),
      top_tracks: await getArtistTopTrack(
        params.id,
        (query?.locale as string) || "US"
      )
    };
    return { props: data };
  } else return { notFound: true };
};

export default function Id(data: ArtistDataInterface) {
  const dispatch = useDispatch();
  useEffect(() => {
    const collectionData: PlaylistObject = {
      name: data.artist.name,
      description: "",
      owner: {
        display_name: "",
        id: "",
        images: [{ url: "", height: 0, width: 0 }],
        type: "user"
      },
      images: data.artist.images,
      tracks: { items: data.top_tracks.map((e) => ({ track: e })) },
      type: "playlist"
    };
    dispatch(setPlaylist(collectionData));
  }, [data, dispatch]);

  return (
    <Stack gap={3} sx={{ padding: "2rem 1rem" }}>
      <FilterComponent />
      <PlaylistThumbnail />
      <PlaylistMetadata />
      <Tracks />
    </Stack>
  );
}
