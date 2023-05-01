import "@/styles/globals.css";
import { themeSettings } from "@/components/theme";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppInitialProps, AppProps } from "next/app";
import { store } from "@/components/store";
import { Provider, useDispatch } from "react-redux";
import A, { AppContext } from "next/app";
import {
  getCurrentUserProfile,
  getUser
} from "@/components/stateSlice/SpotifyAPI";
import { UserObject } from "@/components/stateSlice/SpotifyAPI/interfaces";
import { setUser } from "@/components/stateSlice/SpotifyAPI/data";
import MobileWidget from "@/components/Layout/MobileWidget";
import { Parent } from ".";

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

function DefineUser({ user, children }: { user?: UserObject; children: any }) {
  const dispatch = useDispatch();
  if (user) dispatch(setUser(user));
  return children;
}

const App = (ctx: AppProps & { user?: UserObject }) => {
  const { Component, pageProps, user } = ctx;

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <DefineUser user={user}>
          <Parent>
            <Component {...pageProps} />
            <MobileWidget />
          </Parent>
        </DefineUser>
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
    const Cookie = parseCookie(req.headers.cookie);

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
