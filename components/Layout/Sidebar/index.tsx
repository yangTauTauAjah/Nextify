import Home from "@mui/icons-material/Home";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import Search from "@mui/icons-material/Search";
import SpotifyLogo from "../../SpotifyLogo";
import { Box, useTheme } from "@mui/material";
import NavLink from "./Navlink";
import PlayLists from "./Playlists";
import InstallApp from "./InstallApp";
// import { PlaylistObject } from "@/components/interfaces";

const link = [
  {
    href: "/",
    icon: <Home fontSize="medium" />,
    text: "Home"
  },
  {
    href: "/search",
    icon: <Search fontSize="medium" />,
    text: "Search"
  },
  {
    href: "/collection",
    icon: <LibraryMusic fontSize="medium" />,
    text: "Your library"
  }
];
const list = [
  {
    href: "/",
    text: "playlist1"
  }
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
];

const Logo = () => {
  const Theme = useTheme();

  return (
    <Box
      sx={{
        display: "none",
        height: "2.5rem",
        marginBottom: "2rem",
        [Theme.breakpoints.up("sm")]: {
          display: "unset"
        }
      }}>
      <SpotifyLogo fill="#ffffff" />
    </Box>
  );
};

export default function Sidebar({
  currentPlaylistId,
  list
}: {
  currentPlaylistId?: string;
  list: { id: string; text: string }[];
}) {
  const Theme = useTheme();

  return (
    <Box
      sx={{
        display: 'none',
        position: "relative",
        justifyContent: "space-between",
        flexDirection: "column",
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        padding: "1rem",
        width: "240px",
        gridArea: "nav-bar",
        [Theme.breakpoints.up('sm')]: {
          display: "flex"
        }
      }}>
      <Logo />
      <NavLink link={link} />
      <PlayLists currentPlaylistId={currentPlaylistId} list={list} />
      <InstallApp />
    </Box>
  );
}
