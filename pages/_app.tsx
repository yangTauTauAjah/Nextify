import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppInitialProps, AppProps } from "next/app";
import { themeSettings } from "@/components/theme";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { store } from "@/components/store";
import A, { AppContext } from "next/app";
import {
  getCurrentUserPlaylist,
  getCurrentUserProfile,
  getRecentlyPlayedTrack
} from "@/components/request";
import {
  PlaylistObject,
  TrackObject,
  UserObject
} from "@/components/interfaces";
import { parseCookie, timeToSec } from "@/components/functions";
import Parent from "@/components/Layout/Parent";
import Widget from "@/components/Layout/Widget";

const Theme = createTheme(themeSettings);

const App = (
  ctx: AppProps & {
    user?: UserObject;
    nowPlaying: TrackObject;
    savedPlaylist?: PlaylistObject[];
  }
) => {

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

App.getInitialProps = async (context: AppContext) => {
  const {
    ctx: { req, res, pathname }
  } = context;

  const r: AppInitialProps & {
    user?: UserObject;
    nowPlaying?: TrackObject;
    savedPlaylist?: PlaylistObject[];
  } = await A.getInitialProps(context);

  if (!req?.headers.cookie) return { ...r };

  const Cookie = parseCookie(req.headers.cookie);

  if (!Cookie.refresh_token) return { ...r };

  // const NowPlaying = await getCurrentlyPlayingTrack(Cookie.refresh_token);
  const savedPlaylist = await getCurrentUserPlaylist(Cookie.refresh_token);

  if (savedPlaylist) r.savedPlaylist = savedPlaylist;
  /* if (NowPlaying) {
    r.nowPlaying = NowPlaying;
  } else { */
  const recentlyPlayed = await getRecentlyPlayedTrack(Cookie.refresh_token);
  if (recentlyPlayed) r.nowPlaying = recentlyPlayed[0];
  // }

  if (pathname === "/callback") return { ...r };

  res?.setHeader("Set-Cookie", [
    `refresh_token=${Cookie.refresh_token}; Max-Age=${timeToSec(
      0,
      0,
      0,
      3
    )}; Secure; HttpOnly; Path=/`
  ]);

  r.user = await getCurrentUserProfile(Cookie.refresh_token);

  return { ...r };
};

export default App;
