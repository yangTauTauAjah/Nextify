import { TrackObject } from "@/components/interfaces";
import { playNext, playPrevious } from "@/components/stateSlice/SpotifyAPI";
import { RootState } from "@/components/store";
import DevicesOther from "@mui/icons-material/DevicesOther";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipNextRounded from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRounded from "@mui/icons-material/SkipPreviousRounded";
import StopRounded from "@mui/icons-material/StopRounded";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function NowPlayingBar({
  IsPlaying,
  Timestamp,
  setTimestamp,
  incrementTimestamp,
  thumbnail,
  songName,
  artist
}: {
  IsPlaying: boolean;
  Timestamp: number;
  setTimestamp: (...params: any[]) => any;
  incrementTimestamp: (...params: any[]) => any;
  thumbnail: string;
  songName: string;
  artist: string;
}) {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state: RootState) => state.data.nowPlaying);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "0.5rem",
        height: "4rem",
        background: (theme) => theme.palette.primary.main,
        borderRadius: "0.5rem",
        fontSize: "0.7rem"
      }}>
      <div className="flex mr-auto h-full gap-1 grow-1">
        <div
          className="aspect-square overflow-hidden shrink-0"
          style={{ borderRadius: "5px" }}>
          <Image
            sizes="10vw"
            style={{ objectFit: "cover" }}
            src={thumbnail}
            fill
            alt="image"
          />
        </div>
        <div style={{ alignSelf: "center" }}>
          <p style={{ fontWeight: "700" }}>{songName}</p>
          <p style={{ marginTop: "0.3rem" }}>{artist}</p>
        </div>
      </div>
      <SkipPreviousRounded
        className="hover:pointer"
        onClick={() => {
          dispatch(playPrevious());
          // setTimestamp(0);
        }}
        sx={{ fontSize: "2rem" }}
      />
      {IsPlaying ? (
        <StopRounded
          className="hover:pointer"
          onClick={() => incrementTimestamp(false)}
          sx={{ fontSize: "2rem" }}
        />
      ) : (
        <PlayArrowRounded
          className="hover:pointer"
          onClick={() => incrementTimestamp(true)}
          sx={{ fontSize: "2rem" }}
        />
      )}
      <SkipNextRounded
        className="hover:pointer"
        onClick={() => {
          dispatch(playNext());
          // setTimestamp(0);
        }}
        sx={{ fontSize: "2rem" }}
      />
      <span
        style={{
          position: "absolute",
          overflow: "hidden",
          borderRadius: "5px",
          left: "50%",
          bottom: "0",
          width: "95%",
          height: "3px",
          background: "rgba(255,255,255,0.3)",
          transform: "translateX(-50%)"
        }}>
        {nowPlaying && (
          <span
            style={{
              display: "block",
              background: "white",
              width: `${(Timestamp / (nowPlaying?.duration_ms / 1000)) * 100}%`,
              height: "100%"
            }}></span>
        )}
      </span>
    </Box>
  );
}

export default NowPlayingBar;
