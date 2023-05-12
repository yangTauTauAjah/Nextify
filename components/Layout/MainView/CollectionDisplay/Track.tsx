import Image from "next/image";
import { AlbumObject, ArtistObject } from "../../../interfaces";
import Link from "next/link";
import MoreVert from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";


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

export const ArtistNameComponent = styled(Link)(({ theme }) => ({
  paddingBlock: "3px",
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  "&::before": { background: theme.typography.subtitle1.color }
}));

const SongMetadata = ({
  id,
  name,
  explicit,
  artists
}: {
  id: string;
  name: string;
  explicit: boolean;
  artists: ArtistObject[];
}) => {
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
  artists,
  onClick
}: {
  id: string;
  name: string;
  album: AlbumObject;
  explicit: boolean;
  artists: ArtistObject[];
  duration_ms: number;
  onClick?: () => any;
}) {
  return (
    <Wrapper onClick={onClick}>
      {album && <ImageComponent src={album.images[0].url} />}
      <SongMetadata id={id} name={name} explicit={explicit} artists={artists} />
      <MoreVert />
    </Wrapper>
  );
}
