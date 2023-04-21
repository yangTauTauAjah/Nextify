import MainView from "@/components/Layout/MainView";
import MobileWidget from "@/components/Layout/MobileWidget";
import NowPlayingBar from "@/components/Layout/NowPlayingBar";
import Sidebar from "@/components/Layout/Sidebar";
import { forceResize } from "@/components/stateSlice/screenWidth";
import { RootState } from "@/components/store";
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
import { Box, Stack, styled, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const isAuthorized = false

const Parent = styled('div')(({theme}) => ({
  /* gridTemplateAreas: `
    "top-bar         top-bar         top-bar"
    "nav-bar         main-view       right-sidebar"
    "now-playing-bar now-playing-bar now-playing-bar"
  `, */
  [theme.breakpoints.up('sm')]: {
    gridTemplateAreas: `
      "nav-bar         main-view      "
      "now-playing-bar now-playing-bar"
    `,
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto 1fr auto',
  }
}))

export default function Main() {

  const Theme = useTheme()
  const screenWidth = useSelector((state: RootState) => state.screenWidth.value)
  const dispatch = useDispatch()

  useEffect(() => {

    const {xs, sm, md, lg, xl} = Theme.breakpoints.values

    window.addEventListener('resize', function() {
      if (window.innerWidth > xs && window.innerWidth <= sm) dispatch(forceResize('xs'))
      else if (window.innerWidth > sm && window.innerWidth <= md) dispatch(forceResize('sm'))
      else if (window.innerWidth > md && window.innerWidth <= lg) dispatch(forceResize('md'))
      else if (window.innerWidth > lg && window.innerWidth <= xl) dispatch(forceResize('lg'))
      else dispatch(forceResize('xl'))
    })

  }, [Theme.breakpoints.values, dispatch])

  return (
    <Parent>
      {/* {
        screenWidth !== 'xs' && <>
          <Sidebar />
          <NowPlayingBar />
        </>
      } */}
      <MainView />
      {/* {
        screenWidth === 'xs' && <MobileWidget />
      } */}
      <MobileWidget />
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