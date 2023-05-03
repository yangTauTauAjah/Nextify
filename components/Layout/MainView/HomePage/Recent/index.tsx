import React from "react";
import Greeting from "./Greeting";
import Header from "./Header";
import SongList from "./SongList";
import { Stack } from "@mui/material";
import { PlaylistObject } from "@/components/interfaces";

function Recent({
  message,
  playlists
}: {
  message: string;
  playlists: PlaylistObject[];
}) {
  return (
    <Stack gap={2}>
      <Greeting message={message} />
      <Header />
      <SongList playlists={playlists} />
    </Stack>
  );
}

export default Recent;
