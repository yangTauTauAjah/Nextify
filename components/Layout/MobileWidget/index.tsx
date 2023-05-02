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
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";

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

function MobileWidget() {
  const router = useRouter();
  const nowPlaying = useSelector((state: RootState) => state.data.nowPlaying);
  let init = 0;

  switch (router.pathname) {
    case "/search":
      init = 1;
      break;
    case "/collection":
      init = 2;
      break;
  }

  return (
    <Stack
      className="fixed left-0 bottom-0 w-full px-1"
      sx={{
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
      }}>
      {nowPlaying && (
        <NowPlayingBar
          thumbnail={nowPlaying.album.images[0]?.url}
          songName={nowPlaying.name}
          artist={nowPlaying.artists[0]?.name}
        />
      )}
      <NavLink link={link} />
    </Stack>
  );
}

export default MobileWidget;
