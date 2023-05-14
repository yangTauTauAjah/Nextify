import { Box, useTheme } from "@mui/material";
import PlayerControl from "./PlayerControl";
import VolumeControl from "./VolumeControl";
import Widget from "./Widget";

export default function NowPlayingBar({
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

  return (
    <Box
    className='hidden relative w-full mx-auto px-1 gap-3 justify-center items-center'
      sx={{
        padding: "10px",
        gridArea: "now-playing-bar",
        height: "90px",
        background: "#181818",
        borderTop: "solid 1px #222222",
        [Theme.breakpoints.up('sm')]: {
          display: "flex"
        }
      }}>
      {/* <Widget /> */}
      {/* <PlayerControl
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={incrementTimestamp}
      /> */}
      <VolumeControl />
    </Box>
  );
}
