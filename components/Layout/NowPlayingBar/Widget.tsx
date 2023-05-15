import { ArtistObject } from "@/components/interfaces";
import { RootState } from "@/components/store";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import PictureInPictureAlt from "@mui/icons-material/PictureInPictureAlt";
import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Widget({
  image,
  id,
  title,
  artists
}: {
  image: string;
  id: string;
  title: string;
  artists: ArtistObject[];
}) {
  const Theme = useTheme();

  return (
    <Box
      className="flex flex-row items-center gap-1"
      sx={{
        width: "33.33%"
      }}>
      <Box
        sx={{
          borderRadius: "5px",
          overflow: "hidden",
          height: "3rem",
          aspectRatio: "1"
        }}>
        <Image
          fill
          className="object-contain h-full"
          sizes="10vw"
          src={image}
          alt="music"
        />
      </Box>
      <Box>
        <Box
          component={Link}
          sx={{ "&::before": { background: "white" } }}
          href={`/track/${id}`}>
          {title}
        </Box>
        <div>
          {artists.reduce((acc: JSX.Element[], curr, index, array) => {
            acc.push(
              <Box
                className="white-hover"
                component={Link}
                sx={{
                  fontSize: "0.7rem",
                  "&::before": { background: Theme.typography.subtitle1.color }
                }}
                key={2 * index}
                href={`/artist/${curr.id}`}>
                {curr.name}
              </Box>
            );
            if (index !== array.length - 1) {
              acc.push(<span key={2 * (index + 1)}>,&nbsp;</span>);
            }
            return acc;
          }, [])}
        </div>
      </Box>
      <FavoriteBorder className="white-hover" />
      <PictureInPictureAlt className="white-hover" />
    </Box>
  );
}
