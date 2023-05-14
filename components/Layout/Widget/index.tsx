import { PlaylistObject } from "@/components/interfaces";
import { playNext } from "@/components/stateSlice/SpotifyAPI";
import { RootState } from "@/components/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileWidget from "./MobileWidget";
import Sidebar from "../Sidebar";
import NowPlayingBar from "../NowPlayingBar";
import { useRouter } from "next/router";


export default function Widget({ savedPlaylist }: { savedPlaylist?: PlaylistObject[] }) {

  const router = useRouter();
  const [IsPlaying, setIsPlaying] = useState(false);
  const [Timestamp, setTimestamp] = useState(360);
  /* const [Id, setId] = useState<NodeJS.Timer>();

  const state = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (IsPlaying) {
      setId(
        setInterval(() => {
          setTimestamp((prev) => prev + 1);
        }, 1000)
      );
    }
  }, [IsPlaying]);

  useEffect(() => {
    if (!IsPlaying) clearInterval(Id);
  }, [IsPlaying, Id]);

  useEffect(() => {
    if (state.nowPlaying && Timestamp > state.nowPlaying.duration_ms / 1000) {
      setTimestamp(0);
      setIsPlaying(false);
      if (state.playingOrder) {
        dispatch(playNext());
        setIsPlaying(true);
      }
    }
  }, [
    dispatch,
    state.collection,
    state.playingOrder,
    state.nowPlaying,
    Timestamp,
    IsPlaying
  ]);

  useEffect(() => {
    if (state.playingOrder) setTimestamp(0);
  }, [state.playingOrder]); */

  return (
    <>
      {/* <MobileWidget
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={setIsPlaying}
      /> */}
      <Sidebar
        currentPlaylistId={router.query.id?.toString()}
        list={(savedPlaylist || []).map((e) => ({
          id: e.id,
          text: e.name
        }))}
      />
      {/* <NowPlayingBar
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={setIsPlaying}
      /> */}
    </>
  );
}