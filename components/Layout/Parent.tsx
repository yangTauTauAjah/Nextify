import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNowPlaying, setUser } from "../stateSlice/SpotifyAPI";
import { TrackObject, UserObject } from "../interfaces";

interface GlobalState {
  user?: UserObject;
  nowPlaying?: TrackObject;
}

export default function Parent({ global, children }: { global?: GlobalState; children: any }) {

  const dispatch = useDispatch();

  const Theme = useTheme();

  useEffect(() => {
    if (global?.user) dispatch(setUser(global.user));
    if (global?.nowPlaying) dispatch(setNowPlaying(global.nowPlaying));
  }, [dispatch, global?.nowPlaying, global?.user]);

  return (
    <Box
      sx={{
        height: "auto",
        gridTemplateAreas: `
          "top-bar         top-bar         top-bar"
          "nav-bar         main-view       right-sidebar"
          "now-playing-bar now-playing-bar now-playing-bar"
        `,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr auto",
        "& > *:nth-child(1)": {
          gridArea: "main-view",
          overflow: "auto",
          overflowY: "overlay",
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0)",
            transition: "background-color 1s ease-in-out"
          },
          "&:hover::-webkit-scrollbar-thumb": {
            background: "rgba(30, 30, 30, 1)"
          }
        },
        [Theme.breakpoints.up("sm")]: {
          display: "grid",
          height: "100vh",
          overflowX: 'auto',
          minWidth: Theme.breakpoints.values.lg
        }
      }}>
      {children}
    </Box>
  );
}