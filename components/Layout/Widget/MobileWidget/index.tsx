import DownloadForOfflineRounded from "@mui/icons-material/DownloadForOfflineRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import LibraryMusicRounded from "@mui/icons-material/LibraryMusicRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import { Stack, useTheme } from "@mui/material";
import React from "react";
import NavLink from "./Navlink";
import NowPlayingBar from "./NowPlayingBar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";

const link = [
  {
    href: "/",
    icon: <HomeRounded sx={{ fontSize: "10vw" }} />,
    text: "Home"
  },
  {
    href: "/search",
    icon: <SearchRounded sx={{ fontSize: "10vw" }} />,
    text: "Search"
  },
  {
    href: "/collection",
    icon: <LibraryMusicRounded sx={{ fontSize: "10vw" }} />,
    text: "Your library"
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.spotify.music",
    icon: <DownloadForOfflineRounded sx={{ fontSize: "10vw" }} />,
    text: "Install App"
  }
];

function MobileWidget({
  IsPlaying,
  Timestamp,
  setTimestamp,
  incrementTimestamp
}: {
  IsPlaying: boolean;
  Timestamp: number;
  setTimestamp: (...params: any[]) => any;
  incrementTimestamp: (...params: any[]) => any;
}) {

  const router = useRouter();
  const state = useSelector((state: RootState) => state.data);
  const Theme = useTheme()

  /* function skip() {
    if (!state.collection || !state.playingOrder) return;

    dispatch(setPlayingOrder(state.playingOrder + 1))

    if (state.collection.type === "album")
      dispatch(
        setNowPlaying(state.collection.tracks.items[state.playingOrder + 1])
      );
    else if (state.collection.type === "playlist")
      dispatch(
        setNowPlaying(
          state.collection.tracks.items[state.playingOrder + 1].track
        )
      );
  } */

  return (
    <Stack
      className="fixed left-0 bottom-0 w-full px-1"
      sx={{
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          [Theme.breakpoints.up('sm')]: {
            display: "none"
          }
      }}>
      {state.nowPlaying && (
        <NowPlayingBar
          IsPlaying={IsPlaying}
          Timestamp={Timestamp}
          setTimestamp={setTimestamp}
          incrementTimestamp={incrementTimestamp}
          thumbnail={state.nowPlaying.album.images[0]?.url}
          songName={state.nowPlaying.name}
          artist={state.nowPlaying.artists[0]?.name}
        />
      )}
      <NavLink link={link} />
    </Stack>
  );
}

export default MobileWidget;
