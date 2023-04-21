import { Home, LibraryMusic, Search } from "@mui/icons-material";
import SpotifyLogo from "../../SpotifyLogo";
import { Box, useTheme } from "@mui/material";
import NavLink from "./Navlink";
import PlayLists from "./Playlists";
import InstallApp from "./InstallApp";

const link = [
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
]
const list = [
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
]

const Logo = () => {

  const Theme = useTheme()

  return (
    <Box 
      sx={{ 
        display: 'none', 
        height: '2.5rem', 
        marginBottom: '2rem', 
        [Theme.breakpoints.up('sm')]: { 
          display: 'unset' 
        } 
      }}
    >
      <SpotifyLogo fill='#ffffff' />
    </Box>
  )
}




export default function Sidebar() {

  const Theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0',
        display: 'flex',
        justifyContent: 'space-between',
        background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        paddingInline: '1.5rem',
        width: '100%',
        height: '4rem',
        gridArea: 'nav-bar',
        [Theme.breakpoints.up('sm')]: {
          width: '240px',
        }
      }}
    >
      <Logo />
      <NavLink link={link} />
      <PlayLists list={list} />
      <InstallApp />
    </Box>
  )
}