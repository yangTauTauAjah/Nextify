import PlayerControl from "./PlayerControl"
import VolumeControl from "./VolumeControl"
import Widget from "./Widget"


export default function NowPlayingBar() {
  return (
    <div style={{
      gridArea: 'now-playing-bar',
      display: 'flex',
      gap: '3rem',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90px',
      background: '#181818',
      borderTop: 'solid 1px #222222',
      paddingInline: '1rem'
    }}>
      <Widget />
      <PlayerControl />
      <VolumeControl />
    </div>
  )
}