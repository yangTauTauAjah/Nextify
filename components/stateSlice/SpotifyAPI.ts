import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlbumObject, PlaylistObject, TrackObject, UserObject } from "../interfaces";

export type DisplaySlice = {
  timestamp: number,
  activeLink: number,
  nowPlaying?: TrackObject,
  user?: UserObject,
  album?: AlbumObject,
  playlist?: PlaylistObject,
  track?: PlaylistObject
}

const initialState: DisplaySlice = {timestamp: 0, activeLink: 0};

export const display = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setTimestamp(state, action: PayloadAction<number>) {
      state.activeLink = action.payload
    },
    setActiveLink(state, action: PayloadAction<number>) {
      state.activeLink = action.payload
    },
    setNowPlaying(state, action: PayloadAction<TrackObject>) {
      state.nowPlaying = action.payload
    },
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

export const { setPlaylist, setAlbum, setTrack, setUser, setActiveLink, setNowPlaying, setTimestamp } = display.actions;

export default display.reducer;
