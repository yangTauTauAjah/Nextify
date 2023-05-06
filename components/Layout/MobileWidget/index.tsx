import {
  DownloadForOfflineOutlined,
  DownloadForOfflineRounded,
  Home,
  HomeRounded,
  LibraryMusic,
  LibraryMusicRounded,
  Search,
  SearchRounded
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import NavLink from "./Navlink";
import NowPlayingBar from "./NowPlayingBar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/store";
import { setNowPlaying, setPlayingOrder } from "@/components/stateSlice/SpotifyAPI";

const link = [
  {
    href: "/",
    icon: <HomeRounded sx={{ fontSize: "6vh" }} />,
    text: "Home"
  },
  {
    href: "/search",
    icon: <SearchRounded sx={{ fontSize: "6vh" }} />,
    text: "Search"
  },
  {
    href: "/collection",
    icon: <LibraryMusicRounded sx={{ fontSize: "6vh" }} />,
    text: "Your library"
  },
  {
    href: "/",
    icon: <DownloadForOfflineRounded sx={{ fontSize: "6vh" }} />,
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
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.data);
  let init = 0;

  switch (router.pathname) {
    case "/search":
      init = 1;
      break;
    case "/collection":
      init = 2;
      break;
  }

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
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
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
