import { FavoriteBorder, PictureInPictureAlt } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Widget() {
  const Theme = useTheme();

  return (
    <Stack
      sx={{
        flexGrow: "1"
      }}
      direction="row"
      alignItems="center"
      gap="1rem">
      <Box
        sx={{
          height: "3rem",
          aspectRatio: "1"
        }}>
        <Image sizes="10vw" src="" alt="music" />
      </Box>
      <Box
        sx={{
          marginRight: "auto"
        }}>
        <Link href="/" legacyBehavior>
          <a>Test</a>
        </Link>
        <div>
          <Link href="/" legacyBehavior>
            <a>Test</a>
          </Link>
          {", "}
          <Link href="/" legacyBehavior>
            <a>Test</a>
          </Link>
        </div>
      </Box>
      <FavoriteBorder
        sx={{
          fontSize: "2rem",
          [Theme.breakpoints.up("sm")]: {
            fontSize: "small"
          }
        }}
      />
      <PictureInPictureAlt
        sx={{
          fontSize: "2rem",
          [Theme.breakpoints.up("sm")]: {
            fontSize: "small"
          }
        }}
      />
    </Stack>
  );
}
