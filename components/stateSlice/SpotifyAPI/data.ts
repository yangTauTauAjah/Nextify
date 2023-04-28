import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlbumObject, PlaylistObject } from "./interfaces";

export type DisplaySlice = {
  album?: AlbumObject,
  playlist?: PlaylistObject,
  track?: PlaylistObject
}

const initialState: DisplaySlice = {};

export const display = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<PlaylistObject>) {
      state.playlist = action.payload;
    },
    setAlbum(state, action: PayloadAction<AlbumObject>) {
      state.album = action.payload;
    },
    setTrack(state, action: PayloadAction<PlaylistObject>) {
      state.track = action.payload;
    }
  }
});

export const { setPlaylist, setAlbum, setTrack } = display.actions;

export default display.reducer;
