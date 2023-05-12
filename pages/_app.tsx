import "@/styles/globals.css";
import { themeSettings } from "@/components/theme";

import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import useTheme from "@mui/material/styles/useTheme";

import type { AppInitialProps, AppProps } from "next/app";
import { RootState, store } from "@/components/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import A, { AppContext } from "next/app";
import {
  getCurrentUserPlaylist,
  getCurrentUserProfile,
  getCurrentlyPlayingTrack,
  getRecentlyPlayedTrack
} from "@/components/request";
import {
  PlaylistObject,
  TrackObject,
  UserObject
} from "@/components/interfaces";
import {
  playNext,
  setNowPlaying,
  setUser
} from "@/components/stateSlice/SpotifyAPI";
import MobileWidget from "@/components/Layout/MobileWidget";
import { useEffect, useState } from "react";
import NowPlayingBar from "@/components/Layout/NowPlayingBar";
import Sidebar from "@/components/Layout/Sidebar";
import { parseCookie, timeToSec } from "@/components/functions";
import { useRouter } from "next/router";

interface GlobalState {
  user?: UserObject;
  nowPlaying?: TrackObject;
}

const Theme = createTheme(themeSettings);

function Parent({ global, children }: { global?: GlobalState; children: any }) {
  console.log('Parent Component')
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

function Widget({ savedPlaylist }: { savedPlaylist?: PlaylistObject[] }) {
  console.log('Widget component')
  const router = useRouter();
  const [IsPlaying, setIsPlaying] = useState(false);
  const [Timestamp, setTimestamp] = useState(360);
  const [Id, setId] = useState<NodeJS.Timer>();

  const state = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (IsPlaying) {
      setId(
        setInterval(() => {
          setTimestamp((prev) => prev + 1);
        }, 1000)
      );
    }
  }, [IsPlaying]);

  useEffect(() => {
    if (!IsPlaying) clearInterval(Id);
  }, [IsPlaying, Id]);

  useEffect(() => {
    if (state.nowPlaying && Timestamp > state.nowPlaying.duration_ms / 1000) {
      setTimestamp(0);
      setIsPlaying(false);
      if (state.playingOrder) {
        dispatch(playNext());
        setIsPlaying(true);
      }
    }
  }, [
    dispatch,
    state.collection,
    state.playingOrder,
    state.nowPlaying,
    Timestamp,
    IsPlaying
  ]);

  useEffect(() => {
    if (state.playingOrder) setTimestamp(0);
  }, [state.playingOrder]);

  return (
    <>
      <MobileWidget
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={setIsPlaying}
      />
      <Sidebar
        currentPlaylistId={router.query.id?.toString()}
        list={(savedPlaylist || []).map((e) => ({
          id: e.id,
          text: e.name
        }))}
      />
      <NowPlayingBar
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={setIsPlaying}
      />
    </>
  );
}

const App = (
  ctx: AppProps & {
    user?: UserObject;
    nowPlaying: TrackObject;
    savedPlaylist?: PlaylistObject[];
  }
) => {
  console.log('App component')
  const { Component, pageProps, user, nowPlaying, savedPlaylist } = ctx;

  pageProps.savedPlaylist = savedPlaylist;

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Parent global={{ user, nowPlaying }}>
          <Component {...pageProps} savedPlaylist={savedPlaylist} />
          <Widget savedPlaylist={savedPlaylist} />
        </Parent>
      </Provider>
    </ThemeProvider>
  );
};

// App.getInitialProps = async (context: AppContext) => {
//   const {
//     ctx: { req, res, pathname }
//   } = context;

//   const r: AppInitialProps & {
//     user?: UserObject;
//     nowPlaying?: TrackObject;
//     savedPlaylist?: PlaylistObject[];
//   } = await A.getInitialProps(context);

//   if (!req?.headers.cookie) return { ...r };

//   const Cookie = parseCookie(req.headers.cookie);

//   if (!Cookie.refresh_token) return { ...r };

//   // const NowPlaying = await getCurrentlyPlayingTrack(Cookie.refresh_token);
//   const savedPlaylist = await getCurrentUserPlaylist(Cookie.refresh_token);

//   if (savedPlaylist) r.savedPlaylist = savedPlaylist;
//   /* if (NowPlaying) {
//     r.nowPlaying = NowPlaying;
//   } else { */
//     const recentlyPlayed = await getRecentlyPlayedTrack(Cookie.refresh_token);
//     if (recentlyPlayed) r.nowPlaying = recentlyPlayed[0];
//   // }

//   if (pathname === "/callback") return { ...r };

//   res?.setHeader("Set-Cookie", [
//     `refresh_token=${Cookie.refresh_token}; Max-Age=${timeToSec(
//       0,
//       0,
//       0,
//       3
//     )}; Secure; HttpOnly; Path=/`
//   ]);

//   r.user = await getCurrentUserProfile(Cookie.refresh_token);

//   return { ...r };
// };

export default App;
