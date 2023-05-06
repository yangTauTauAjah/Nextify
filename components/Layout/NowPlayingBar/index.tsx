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
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        padding: "10px",
        marginInline: "auto",
        gridArea: "now-playing-bar",
        gap: "3rem",
        justifyContent: "center",
        alignItems: "center",
        height: "90px",
        background: "#181818",
        borderTop: "solid 1px #222222",
        paddingInline: "1rem"
      }}>
      <Widget />
      <PlayerControl
        Timestamp={Timestamp}
        setTimestamp={setTimestamp}
        IsPlaying={IsPlaying}
        incrementTimestamp={incrementTimestamp}
      />
      <VolumeControl />
    </Box>
  );
}
