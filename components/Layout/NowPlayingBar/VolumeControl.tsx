import React from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import DevicesOther from "@mui/icons-material/DevicesOther";
import VolumeUp from "@mui/icons-material/VolumeUp";
// import VolumeOff from "@mui/icons-material/VolumeOff";
import Slider from "@mui/material/Slider";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

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
