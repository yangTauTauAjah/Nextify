import SpotifyLogo from "@/components/SpotifyLogo"
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
import { Box } from "@mui/material";
import Link from "next/link";

const isAuthorized = false

function NavLink(props: { link: Array<{ href: string, icon: React.ReactNode, text: string }>, style?: any }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        ...props.style
      }}
    >{
        props.link.map((e, i) => (
          <Link key={i} href={e.href} legacyBehavior>
            <a style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {e.icon}
              <p>{e.text}</p>
            </a>
          </Link>
        ))
      }</Box>
  )
}

function PlayLists(props: { list: Array<{ href: string, text: string }> }) {
  return (
    <Box sx={{
      fontSize: '1rem',
      overflow: 'auto',
      marginBlockEnd: 'auto',
      '&::-webkit-scrollbar': {
        width: '10px',
        background: 'rgba(0,0,0,0)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,.0)',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,.3)',
      }
    }} >{
        props.list.map((e, i) => (
          <Link key={i} href={e.href}>
            <div style={{ height: '2rem', lineHeight: '1.6' }}>{e.text}</div>
          </Link>
        ))
      }</Box>
  )
}

export default function Main() {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateAreas: `
        "top-bar         top-bar         top-bar"
        "nav-bar         main-view       right-sidebar"
        "now-playing-bar now-playing-bar now-playing-bar"
      `,
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto 1fr auto'

    }}>
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'black',
          padding: '1.5rem',
          paddingBottom: '0',
          width: '240px',
          height: 'calc(100vh - 90px)',
          gridArea: 'nav-bar'
        }}
      >
        <div style={{ height: '2.5rem', marginBottom: '2rem' }}>
          <SpotifyLogo fill='#ffffff' />
        </div>
        <NavLink style={{
          borderBottom: 'solid 1px rgba(255,255,255,.1)',
          paddingBottom: '1rem',
          marginBottom: '1rem'
        }} link={[
          {
            href: '/',
            icon: <Home fontSize="medium" />,
            text: 'Home'
          },
          {
            href: '/search',
            icon: <Search fontSize="medium" />,
            text: 'Search'
          },
          {
            href: '/collection',
            icon: <LibraryMusic fontSize="medium" />,
            text: 'Your library'
          }
        ]} />
        <PlayLists list={[
          {
            href: '/',
            text: 'playlist1'
          },
          /* {
            href: '/',
            text: 'playlist2'
          },
          {
            href: '/',
            text: 'playlist3'
          },
          {
            href: '/',
            text: 'playlist4'
          },
          {
            href: '/',
            text: 'playlist5'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          },
          {
            href: '/',
            text: 'playlist6'
          } */
        ]} />
        <Link href='/' legacyBehavior>
          <a style={{height: '3rem', flexShrink: 0, display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <DownloadForOfflineOutlined fontSize="medium" />
            <div>Install App</div>
          </a>
        </Link>
      </aside>
      <div style={{
        gridArea: 'now-playing-bar',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90px',
        background: '#181818',
        borderTop: 'solid 1px #222222'
      }}>

      </div>
    </Box>
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