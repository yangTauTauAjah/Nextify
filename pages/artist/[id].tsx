import {
  getArtist,
  getArtistAlbum,
  getArtistTopTrack,
  getRelatedArtist
} from "@/components/request";
import {
  AlbumObject,
  ArtistObject,
  PlaylistObject,
  TrackObject
} from "@/components/interfaces";
import { GetServerSideProps } from "next";

import {styled, Box, Button, Stack, Typography, useTheme} from '@mui/material';

import { useSelector } from "react-redux";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
import Image from "next/image";
import Section from "@/components/Layout/MainView/HomePage/Section";
import Item from "@/components/Layout/MainView/HomePage/Section/Collection/Item";

import MoreVert from "@mui/icons-material/MoreVert";
import PlayCircle from "@mui/icons-material/PlayCircle";
import Shuffle from "@mui/icons-material/Shuffle";

import { RootState } from "@/components/store";

export const getServerSideProps: GetServerSideProps<
  ArtistDataInterface
> = async ({ params, query }) => {
  if (params?.id && !(params.id instanceof Array)) {
    const artist = await getArtist([params.id]);
    const albums = await getArtistAlbum(params.id);
    const related_artist = await getRelatedArtist(params.id);
    const top_tracks = await getArtistTopTrack(
      params.id,
      (query?.locale as string) || "US"
    );

    const data: ArtistDataInterface = {
      artist: {
        id: "",
        images: [],
        name: "",
        type: "artist"
      },
      albums: [],
      related_artist: [],
      top_tracks: []
    };

    if (artist) data.artist = artist[0];
    if (albums) data.albums = albums;
    if (related_artist) data.related_artist = related_artist;
    if (top_tracks) data.top_tracks = top_tracks;

    return { props: data };
  }

  return { notFound: true };
};

interface ArtistDataInterface {
  artist: ArtistObject;
  albums: AlbumObject[];
  top_tracks: TrackObject[];
  related_artist: ArtistObject[];
}

const Wrapper = styled(Stack)({
  gap: "1.5rem",
  padding: "2rem 1rem",
  background: "rgba(15, 15, 15, 1)"
});

function Banner({ url }: { url: string }) {
  return (
    <div className="sticky top-0 left-0 w-full aspect-square">
      <Image
        src={url}
        fill
        style={{ objectFit: "cover", objectPosition: "top" }}
        alt="img"
      />
    </div>
  );
}

function ArtistName({name}: {name: string}) {

  return (
    <h1
      className="w-full"
      style={{
        padding: "15rem 1rem 1rem 1rem",
        fontSize: "3rem",
        background:
          "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)"
      }}>
      {name}
    </h1>
  );
}

const FollowButtonComponent = styled("button")(({ theme }) => ({
  padding: "5px 8px",
  borderRadius: "5px",
  border: "2px rgba(255,255,255,.3) solid",
  fontSize: theme.typography.button.fontSize,
  background: "transparent"
}));

function ActionButtonsComponent() {
  return (
    <div className="flex items-center" style={{ gap: "1rem" }}>
      <FollowButtonComponent>Follow</FollowButtonComponent>
      <MoreVert
        className="cursor-pointer"
        sx={{ marginRight: "auto" }}
        fontSize="medium"
      />
      <Shuffle className="cursor-pointer" fontSize="medium" />
      <PlayCircle
        className="cursor-pointer"
        sx={{ fontSize: "3rem", color: ({ palette }) => palette.primary.main }}
      />
    </div>
  );
}

function PopularSection({ collection }: { collection: PlaylistObject }) {
  return (
    <section>
      <h1>Popular</h1>
      <Tracks collection={collection} sx={{ padding: "1rem 0 2rem" }} />
    </section>
  );
}

export default function Id(data: ArtistDataInterface) {
  return (
    <Box>
      <Banner url={data.artist.images[0].url} />
      <Box className="absolute top-0 w-full">
        <ArtistName name={data.artist.name} />
        <Wrapper className="pb-10">
          <ActionButtonsComponent />
          {data.top_tracks.length > 0 && <PopularSection
            collection={{
              id: data.artist.id,
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
            }}
          />}
          {data.albums.length > 0 && <Section title="Artist Albums">
            {data.albums.map(({ id, name, release_date, images }) => {
              return (
                <Item
                  key={id}
                  title={name}
                  type="playlist"
                  description={release_date}
                  href={`/album/${id}`}
                  image={images[0]?.url || ''}
                />
              );
            })}
          </Section>}
          {data.related_artist.length > 0 && <Section title="Related Artist">
            {data.related_artist.map(({ id, name, images, type }) => {
              return (
                <Item
                  key={id}
                  title={name}
                  type={type}
                  description={<Typography variant='subtitle1'>Artist</Typography>}
                  href={`/artist/${id}`}
                  image={images[0]?.url || ''}
                />
              );
            })}
          </Section>}
        </Wrapper>
      </Box>
    </Box>
  );
}
