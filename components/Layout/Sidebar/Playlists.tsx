// import { PlaylistObject } from "@/components/interfaces";
import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function PlayLists({list, currentPlaylistId}: {
  currentPlaylistId?: string;
  list: { id: string; text: string }[];
}) {
  const Theme = useTheme();

  return (
    <Box
      sx={{
        fontSize: "1rem",
        overflow: "auto",
        marginTop: "1rem",
        marginBottom: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0,0,0,0)"
        },
        "&:hover::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,.1)"
        }
      }}>
      {list.map((e, i) => (
        <Link key={i} href={`/playlist/${e.id}`}>
          <Typography
            className={currentPlaylistId !== e.id ? 'white-hover' : ''}
            sx={{
              height: "2rem",
              lineHeight: "1.6"
            }}>
            {e.text}
          </Typography>
        </Link>
      ))}
    </Box>
  );
}
