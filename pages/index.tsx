import NowPlayingBar from "@/components/Layout/NowPlayingBar";
import Sidebar from "@/components/Layout/Sidebar";
import {
  Home,
  Search,
  LibraryMusic,
  DownloadForOfflineOutlined,
  Favorite,
  FavoriteBorder,
  PictureInPictureAlt,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  SkipPrevious,
  SkipNext,
  PlayCircle,
  StopCircle,
  Repeat,
  QueueMusic,
  DevicesOther,
  VolumeUp,
  VolumeOff,
  Launch
} from '@mui/icons-material';
import { Box, styled } from "@mui/material";

const isAuthorized = false

const Parent = styled('div')({
  display: 'grid',
  gridTemplateAreas: `
    "top-bar         top-bar         top-bar"
    "nav-bar         main-view       right-sidebar"
    "now-playing-bar now-playing-bar now-playing-bar"
  `,
  gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: 'auto 1fr auto'

})

export default function Main() {
  return (
    <Parent>
      <Sidebar />
      <NowPlayingBar />
    </Parent>
  )
}



/* export async function getServerSideProps() {

  if (!isAuthorized) {
    return {
      redirect: {
        destination: 'https://accounts.spotify.com/authorize?response_type=code&client_id=b6f05292d14148a08f5e70d8fe2ba898&scope=user-read-private user-read-email user-modify-playback-state&redirect_uri=http://localhost:3000&state=34fFs29kd09',
        permanent: false,
      },
    }
  }
  return {
    props: {}
  }
} */