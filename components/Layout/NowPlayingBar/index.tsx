import { Box, useTheme } from "@mui/material"
import PlayerControl from "./PlayerControl"
import VolumeControl from "./VolumeControl"
import Widget from "./Widget"


export default function NowPlayingBar() {

  const Theme = useTheme()

  return (
    <Box sx={{
      position: 'fixed',
      bottom: '4rem',
      width: '97vw',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
      padding: '10px',
      marginInline: 'auto',
      background: '#0fff67',
      borderRadius: '0.5rem',
      [Theme.breakpoints.up('sm')]: {
        gridArea: 'now-playing-bar',
        display: 'flex',
        gap: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90px',
        background: '#181818',
        borderTop: 'solid 1px #222222',
        paddingInline: '1rem'
      }
    }}>
      <Widget />
      <PlayerControl />
      {/* <VolumeControl /> */}
    </Box>
  )
}