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
import { Stack, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
import Image from "next/image";
import Section from "@/components/Layout/MainView/HomePage/Section";
import Item from "@/components/Layout/MainView/HomePage/Section/Collection/Item";
import { MoreVert, PlayCircle, Shuffle } from "@mui/icons-material";
import { RootState } from "@/components/store";

export const getServerSideProps: GetServerSideProps<
  ArtistDataInterface | {}
> = async ({ params, query }) => {
  if (params?.id && !(params.id instanceof Array)) {
    const artist = await getArtist([params.id]);
    const albums = await getArtistAlbum(params.id);
    const related_artist = await getRelatedArtist(params.id);
    const top_tracks = await getArtistTopTrack(
      params.id,
      (query?.locale as string) || "US"
    );

    if (artist && albums && related_artist && top_tracks) {
      const data: ArtistDataInterface = {
        artist: artist[0],
        albums,
        related_artist,
        top_tracks
      };
      return { props: data };
    }
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
  background: "rgba(31, 32, 37, 1)"
});

function Banner() {
  let collection = useSelector((state: RootState) => state.data.collection);
  return (
    <div className="fixed top-0 left-0 w-full aspect-square">
      {collection?.images[0].url && collection?.images[0].url !== "" && (
        <Image
          src={collection.images[0].url}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt="img"
        />
      )}
    </div>
  );
}

function ArtistName() {
  let collection = useSelector((state: RootState) => state.data.collection);
  return (
    <h1
      style={{
        padding: "15rem 1rem 1rem 1rem",
        fontSize: "3rem",
        background:
          "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)"
      }}>
      {collection?.name}
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
  /* const dispatch = useDispatch();
  useEffect(() => {
    const collectionData: PlaylistObject = {
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
    };
    dispatch(setCollection(collectionData));
  }, [data, dispatch]); */

  return (
    <>
      <Banner />
      <ArtistName />
      <Wrapper className="pb-10">
        <ActionButtonsComponent />
        <PopularSection
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
        />
        <Section title="Artist Albums">
          {data.albums.map(({ id, name, release_date, images }) => {
            return (
              <Item
                key={id}
                title={name}
                type="playlist"
                description={release_date}
                href={`/album/${id}`}
                image={images[0].url}
              />
            );
          })}
        </Section>
        <Section title="Related Artist">
          {data.related_artist.map(({ id, name, images, type }) => {
            return (
              <Item
                key={id}
                title={name}
                type={type}
                description="Artist"
                href={`/artist/${id}`}
                image={images[0].url}
              />
            );
          })}
        </Section>
      </Wrapper>
    </>
  );
}
