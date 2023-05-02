import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import {
  AlbumObject,
  ArtistObject,
  TrackObject
} from "../../../interfaces";
import Link from "next/link";
import { Box, Typography, styled } from "@mui/material";

export interface SongComponentInterface {
  id: string;
  name: string;
  album?: AlbumObject;
  explicit?: boolean;
  artists: ArtistObject[];
}

const Wrapper = styled(Box)({
  display: "flex",
  height: "3rem",
  gap: "1rem",
  alignItems: "center"
});

const ImageComponent = ({ src }: { src: string }) => (
  <div style={{ aspectRatio: "1", height: "100%" }}>
    <Image
      sizes="10vw"
      src={src}
      fill
      style={{ objectFit: "contain" }}
      alt="image"
    />
  </div>
);

const ArtistNameComponent = styled(Link)(({ theme }) => ({
  paddingBlock: "3px",
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  "&::before": { background: theme.typography.subtitle1.color }
}));

const SongMetadata = ({
  id,
  name,
  album,
  explicit,
  artists
}: SongComponentInterface) => {
  /* const newArray = myArray.reduce((acc, curr, index, array) => {
  acc.push(curr);
  if (index !== array.length - 1) {
    acc.push(0); // Insert your desired element here
  }
  return acc;
}, []); */
  return (
    <div style={{ marginRight: "auto" }}>
      <Box
        component={Link}
        sx={{
          "&::before": {
            background: "white"
          }
        }}
        href={`/track/${id}`}>
        {name}
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "5px",
          "& > :is(a, span)": {
            color: (theme) => theme.typography.subtitle1.color
          }
        }}>
        {explicit && <Text>LYRICS</Text>}
        {artists.reduce((acc: JSX.Element[], curr, index, array) => {
          acc.push(
            <ArtistNameComponent key={2 * index} href={`/artist/${curr.id}`}>
              {curr.name}
            </ArtistNameComponent>
          );
          if (index !== array.length - 1) {
            acc.push(<span key={2 * (index + 1)}>,&nbsp;</span>);
          }
          return acc;
        }, [])}
      </Box>
    </div>
  );
};

const Text = styled(Typography)(({ theme }) => ({
  cursor: "default",
  background: theme.typography.subtitle1.color,
  borderRadius: "3px",
  padding: "3px",
  marginRight: "3px",
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  color: "rgba(0,0,0,.7)"
}));

export default function Song({
  id,
  name,
  album,
  explicit,
  artists
}: SongComponentInterface) {
  return (
    <Wrapper>
      {album && <ImageComponent src={album.images[0].url} />}
      <SongMetadata id={id} name={name} explicit={explicit} artists={artists} />
      <MoreVert />
    </Wrapper>
  );
}

/* const myArray = [1, 2, 3, 4, 5];

const newArray =  */
