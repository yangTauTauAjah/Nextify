import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlbumObject, PlaylistObject, UserObject } from "./interfaces";

export type DisplaySlice = {
  user?: UserObject,
  album?: AlbumObject,
  playlist?: PlaylistObject,
  track?: PlaylistObject
}

const initialState: DisplaySlice = {};

export const display = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserObject>) {
      state.user = action.payload
    },
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

export const { setPlaylist, setAlbum, setTrack, setUser } = display.actions;

export default display.reducer;
