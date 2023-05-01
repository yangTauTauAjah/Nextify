import "@/styles/globals.css";
import { themeSettings } from "@/components/theme";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppInitialProps, AppProps } from "next/app";
import { store } from "@/components/store";
import { Provider } from "react-redux";
import A, { AppContext } from "next/app";
import {
  getCurrentUserProfile,
  getUser
} from "@/components/stateSlice/SpotifyAPI";
import { UserObject } from "@/components/stateSlice/SpotifyAPI/interfaces";

export function parseCookie(str: string): Record<string, string | undefined> {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      /* @ts-ignore */
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

const Theme = createTheme(themeSettings);

const App = (ctx: AppProps) => {
  const { Component, pageProps } = ctx;

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const {
    ctx: { req, res, pathname }
  } = context;

  const r: AppInitialProps & { user?: UserObject } = await A.getInitialProps(
    context
  );

  if (req?.headers.cookie) {
    const Cookie = parseCookie(req.headers.cookie)

    if (Cookie.refresh_token && pathname !== "/callback") {
      res?.setHeader("Set-Cookie", [
        `refresh_token=${Cookie.refresh_token}; Max-Age=3600; Secure; HttpOnly; Path=/`
      ]);

      r.user = await getCurrentUserProfile(Cookie.refresh_token);
    }
  }

  return { ...r };
};

export default App;
