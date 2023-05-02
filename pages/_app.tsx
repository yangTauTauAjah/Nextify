import "@/styles/globals.css";
import { themeSettings } from "@/components/theme";
import {
  Box,
  ThemeProvider,
  createTheme,
  styled,
  useTheme
} from "@mui/material";
import type { AppInitialProps, AppProps } from "next/app";
import { store } from "@/components/store";
import { Provider, useDispatch } from "react-redux";
import A, { AppContext } from "next/app";
import {
  getCurrentUserProfile,
  getUser
} from "@/components/request";
import { UserObject } from "@/components/interfaces";
import { setUser } from "@/components/stateSlice/SpotifyAPI";
import MobileWidget from "@/components/Layout/MobileWidget";

export function parseCookie(str: string): Record<string, string | undefined> {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: NodeJS.Dict<string>, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

const Theme = createTheme(themeSettings);

function Parent({ user, children }: { user?: UserObject; children: any }) {
  const dispatch = useDispatch();
  const Theme = useTheme();
  if (user) dispatch(setUser(user));

  return (
    <Box
      sx={{
        [Theme.breakpoints.up("sm")]: {
          gridTemplateAreas: `
           "nav-bar         main-view      "
           "now-playing-bar now-playing-bar"
         `,
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "auto 1fr auto"
        }
      }}>
      {children}
    </Box>
  );
}
// styled("div")(({ theme }) => ({
//   /* gridTemplateAreas: `
//     "top-bar         top-bar         top-bar"
//     "nav-bar         main-view       right-sidebar"
//     "now-playing-bar now-playing-bar now-playing-bar"
//   `, */
//   [theme.breakpoints.up("sm")]: {
//     gridTemplateAreas: `
//       "nav-bar         main-view      "
//       "now-playing-bar now-playing-bar"
//     `,
//     gridTemplateColumns: "auto 1fr",
//     gridTemplateRows: "auto 1fr auto"
//   }
// }));

const App = (ctx: AppProps & { user?: UserObject }) => {
  const { Component, pageProps, user } = ctx;

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Parent user={user}>
          <Component {...pageProps} />
          <MobileWidget />
        </Parent>
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
