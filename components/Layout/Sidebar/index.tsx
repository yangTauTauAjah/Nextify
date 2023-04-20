import { DownloadForOfflineOutlined, Home, LibraryMusic, Search } from "@mui/icons-material";
import SpotifyLogo from "../../SpotifyLogo";
import Link from "next/link";
import { Box } from "@mui/material";
import NavLink from "./Navlink";
import PlayLists from "./Playlists";





export default function Sidebar() {
  return(
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
  )
}