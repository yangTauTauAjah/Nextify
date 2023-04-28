import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import {
  AlbumObject,
  ArtistObject,
  TrackObject
} from "../../../stateSlice/SpotifyAPI/interfaces";
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
  color: theme.typography.subtitle1.color,
  "&::before": { background: theme.typography.subtitle1.color }
}));

const SongMetadata = ({
  id,
  name,
  album,
  explicit,
  artists
}: SongComponentInterface) => (
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
    <div style={{ display: "flex", marginTop: "5px" }}>
      {explicit && <Text>LYRICS</Text>}
      {artists.map((e, i) => (
        <ArtistNameComponent key={i} href={`/artist/${e.id}`}>
          {e.name}
        </ArtistNameComponent>
      ))}
    </div>
  </div>
);

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
