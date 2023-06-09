import React from "react";
import Shuffle from "@mui/icons-material/Shuffle";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import SkipNext from "@mui/icons-material/SkipNext";
import PlayCircle from "@mui/icons-material/PlayCircle";
import Repeat from "@mui/icons-material/Repeat";
import PauseCircleRounded from "@mui/icons-material/PauseCircleRounded";
import { Box, Slider,Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/store";
import { playNext, playPrevious } from "@/components/stateSlice/SpotifyAPI";

function PlayerControl({
  IsPlaying,
  Timestamp,
  setTimestamp,
  incrementTimestamp
}: {
  IsPlaying: boolean;
  Timestamp: number;
  setTimestamp: (...params: any[]) => any;
  incrementTimestamp: (...params: any[]) => any;
}) {
  const Theme = useTheme();
  const state = useSelector((state: RootState) => state.data.nowPlaying);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{ width: "33.33%" }}
      className="flex flex-col h-full justify-between items-center">
      <Box className='flex flex-row gap-1 items-center'>
        <Shuffle className="hover:pointer white-hover" />
        <SkipPrevious
          onClick={() => dispatch(playPrevious())}
          className="hover:pointer white-hover"
          fontSize="large"
        />
        {IsPlaying ? (
          <PauseCircleRounded
            onClick={() => incrementTimestamp(false)}
            className="hover:pointer"
            fontSize="large"
          />
        ) : (
          <PlayCircle
            onClick={() => incrementTimestamp(true)}
            className="hover:pointer"
            fontSize="large"
          />
        )}

        <SkipNext
          onClick={() => dispatch(playNext())}
          className="hover:pointer white-hover"
          fontSize="large"
        />
        <Repeat className="hover:pointer white-hover" />
      </Box>
      <Box className="flex flex-row items-center w-full" gap="0.8rem">
        <Typography
          sx={{
            fontSize: Theme.typography.subtitle1.fontSize,
            color: Theme.typography.subtitle1.color
          }}>
          {state?.duration_ms &&
            `${Math.floor(Timestamp / 60)}:${Math.round(Timestamp % 60)
              .toString()
              .padStart(2, "0")}`}
        </Typography>
        <Slider
          sx={{
            flexGrow: 1,
            width: "3rem",
            "& .MuiSlider-thumb": {
              width: "0.8rem",
              height: "0.8rem"
            }
          }}
          /* @ts-ignore */
          onChange={(e) => setTimestamp(e.target?.value || 0)}
          valueLabelDisplay="off"
          min={0}
          max={(state?.duration_ms || 0) / 1000}
          size="medium"
          value={Timestamp}
        />
        <Typography
          sx={{
            fontSize: Theme.typography.subtitle1.fontSize,
            color: Theme.typography.subtitle1.color
          }}>
          {(state?.duration_ms &&
            `${Math.floor(state.duration_ms / 1000 / 60)}:${Math.round(
              (state.duration_ms / 1000) % 60
            )
              .toString()
              .padStart(2, "0")}`) ||
            "0:00"}
        </Typography>
      </Box>
    </Box>
  );
}

export default PlayerControl;
