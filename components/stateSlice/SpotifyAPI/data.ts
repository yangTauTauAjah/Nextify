import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlaylistObject } from "./interfaces";

export type DisplaySlice = {
  album?: PlaylistObject,
  playlist?: PlaylistObject,
  track?: PlaylistObject
}

const initialState: DisplaySlice = {};

export const display = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
    },
    setAlbum(state, action) {
      state.album = action.payload;
    },
    setTrack(state, action) {
      state.track = action.payload;
    }
  }
});

export const { setPlaylist, setAlbum, setTrack } = display.actions;

export default display.reducer;
