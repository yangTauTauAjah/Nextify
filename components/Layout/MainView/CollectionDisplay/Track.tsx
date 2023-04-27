import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { TrackObject } from "../../../stateSlice/SpotifyAPI/interfaces";
import Link from "next/link";
import { Box, Typography, styled } from "@mui/material";

const Wrapper = styled(Box)({
  display: "flex",
  height: "3rem",
  gap: "1rem",
  alignItems: "center"
})

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
)

const ArtistNameComponent = styled(Link)(({ theme }) => ({
  paddingBlock: "3px",
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  color: theme.typography.subtitle1.color,
  "&::before": { background: theme.typography.subtitle1.color }
}));

const SongMetadata = ({ track }: { track: TrackObject }) => (
  <div style={{ marginRight: "auto" }}>
    <Box
      component={Link}
      sx={{
        "&::before": {
          background: "white"
        }
      }}
      href={`/track/${track.id}`}>
      {track.name}
    </Box>
    <div style={{ display: "flex", marginTop: "5px" }}>
      {track.explicit && <Text>LYRICS</Text>}
      {track.artists.map((e, i) => (
        <ArtistNameComponent key={i} href={`/artist/${e.id}`}>
          {e.name}
        </ArtistNameComponent>
      ))}
    </div>
  </div>
)

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

export default function Song({ track }: { track: TrackObject }) {
  return (
    <Wrapper>
      {track.album && <ImageComponent src={track.album.images[0].url}/>}
      <SongMetadata track={track} />
      <MoreVert />
    </Wrapper>
  );
}
