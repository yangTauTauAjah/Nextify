import PlayerControl from "./PlayerControl"
import Widget from "./Widget"


export default function NowPlayingBar() {
  return (
    <div style={{
      gridArea: 'now-playing-bar',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90px',
      background: '#181818',
      borderTop: 'solid 1px #222222',
      padding: '1rem'
    }}>
      <Widget />
      <PlayerControl />
    </div>
  )
}