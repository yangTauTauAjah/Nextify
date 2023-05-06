import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AlbumObject,
  PlaylistObject,
  TrackObject,
  UserObject
} from "../interfaces";

export type DisplaySlice = {
  isPlaying: boolean;
  activeLink: number;
  nowPlaying?: TrackObject;
  playingOrder?: number;
  user?: UserObject;
  collection?: PlaylistObject | AlbumObject;
};

const initialState: DisplaySlice = {
  isPlaying: false,
  activeLink: 0
};

export const display = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setActiveLink(state, action: PayloadAction<number>) {
      state.activeLink = action.payload;
    },
    setPlayingOrder(state, action: PayloadAction<number>) {
      state.playingOrder = action.payload;
    },
    setNowPlaying(state, action: PayloadAction<TrackObject>) {
      state.nowPlaying = action.payload;
    },
    setUser(state, action: PayloadAction<UserObject>) {
      state.user = action.payload;
    },
    setCollection(state, action: PayloadAction<PlaylistObject | AlbumObject>) {
      state.playingOrder = 0;
      state.collection = action.payload;
    },
    playNext(state) {
      console.log("next");
      console.log(state.playingOrder);
      console.log(state.collection?.tracks.items.length);
      if (
        !state.collection ||
        state.playingOrder === null ||
        state.playingOrder === undefined ||
        state.playingOrder >= state.collection.tracks.items.length - 1
      )
        return;

      const { type } = state.collection;

      state.playingOrder += 1;

      if (type === "album")
        state.nowPlaying = state.collection.tracks.items[state.playingOrder];
      else if (type === "playlist")
        state.nowPlaying =
          state.collection.tracks.items[state.playingOrder].track;
    },
    playPrevious(state) {
      console.log("prev");
      console.log(state.playingOrder);
      console.log(state.collection?.tracks.items.length);

      if (
        !state.collection ||
        state.playingOrder === null ||
        state.playingOrder === undefined ||
        state.playingOrder <= 0
      )
        return;

      const { type } = state.collection;

      state.playingOrder -= 1;

      if (type === "album")
        state.nowPlaying = state.collection.tracks.items[state.playingOrder];
      else if (type === "playlist")
        state.nowPlaying =
          state.collection.tracks.items[state.playingOrder].track;
    }
  }
});

export const {
  setCollection,
  setUser,
  setActiveLink,
  setNowPlaying,
  setIsPlaying,
  setPlayingOrder,
  playNext,
  playPrevious
} = display.actions;

export default display.reducer;
