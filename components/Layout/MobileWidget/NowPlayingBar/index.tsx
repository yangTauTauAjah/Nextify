import { TrackObject } from "@/components/interfaces";
import { RootState } from "@/components/store";
import {
  DevicesOther,
  FavoriteBorder,
  PlayArrowRounded,
  StopRounded
} from "@mui/icons-material";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function NowPlayingBar({
  IsPlaying,
  Timestamp,
  incrementTimestamp,
  thumbnail,
  songName,
  artist
}: {
  IsPlaying: boolean;
  Timestamp: number;
  incrementTimestamp: () => any;
  thumbnail: string;
  songName: string;
  artist: string;
}) {
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
      <div className="flex mr-auto h-full gap-1 grow">
        <div
          className="aspect-square overflow-hidden"
          style={{ borderRadius: "5px" }}>
          <Image
            sizes="10vw"
            style={{ objectFit: "cover" }}
            src={thumbnail}
            fill
            alt="image"
          />
        </div>
        <div style={{ alignItems: "center" }}>
          <p style={{ fontWeight: "700" }}>{songName}</p>
          <p style={{ marginTop: "0.3rem" }}>{artist}</p>
        </div>
      </div>
      <DevicesOther sx={{ fontSize: "2rem" }} />
      <FavoriteBorder sx={{ fontSize: "2rem" }} />
      {IsPlaying ? (
        <StopRounded
          className="hover:pointer"
          onClick={() => incrementTimestamp()}
          sx={{ fontSize: "2rem" }}
        />
      ) : (
        <PlayArrowRounded
          className="hover:pointer"
          onClick={() => incrementTimestamp()}
          sx={{ fontSize: "2rem" }}
        />
      )}
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
              width: `${(Timestamp / (nowPlaying?.duration_ms/1000)) * 100}%`,
              height: "100%"
            }}></span>
        )}
      </span>
    </Box>
  );
}

export default NowPlayingBar;
