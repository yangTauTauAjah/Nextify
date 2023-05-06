import React from "react";
import {
  QueueMusic,
  DevicesOther,
  VolumeUp,
  VolumeOff
} from "@mui/icons-material";
import { Box, Slider, Stack } from "@mui/material";

function CustomSlider({ style }: { style?: any }) {
  return (
    <Slider
      sx={{
        ...style,
        "& .MuiSlider-thumb": {
          width: "0.8rem",
          height: "0.8rem"
        }
      }}
      min={0}
      max={100}
      defaultValue={50}
      size="medium"
      valueLabelDisplay="auto"
    />
  );
}

function VolumeControl() {
  return (
    <Stack
      width="33.33%"
      alignItems="center"
      justifyContent="flex-end"
      direction="row"
      gap="1rem">
      <QueueMusic className="white-hover" />
      <DevicesOther className="white-hover" />
      <Stack width="50%" direction="row" gap="0.5rem" alignItems="center">
        <VolumeUp className="white-hover" />
        <CustomSlider style={{ width: "100%" }} />
      </Stack>
    </Stack>
  );
}

export default VolumeControl;
