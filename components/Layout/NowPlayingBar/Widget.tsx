import { RootState } from "@/components/store";
import { FavoriteBorder, PictureInPictureAlt } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Widget() {
  const Theme = useTheme();
  const state = useSelector((state: RootState) => state.data.nowPlaying);

  return (
    <Stack
      className="flex-row items-center gap-1"
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
          src={state?.album.images[0]?.url || ""}
          alt="music"
        />
      </Box>
      <Box>
        <Box
          component={Link}
          sx={{ "&::before": { background: "white" } }}
          href={`/track/${state?.id}`}>
          {state?.name}
        </Box>
        <div>
          {state?.artists.reduce((acc: JSX.Element[], curr, index, array) => {
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
    </Stack>
  );
}
