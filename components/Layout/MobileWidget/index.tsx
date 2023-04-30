import { DownloadForOfflineOutlined, DownloadForOfflineRounded, Home, HomeRounded, LibraryMusic, LibraryMusicRounded, Search, SearchRounded } from '@mui/icons-material'
import { Box, Stack } from '@mui/material'
import React from 'react'
import NavLink from './Navlink'
import NowPlayingBar from './NowPlayingBar'

const link = [
  {
    href: '/',
    icon: <HomeRounded sx={{fontSize: '6vh' }} />,
    text: 'Home'
  },
  {
    href: '/search',
    icon: <SearchRounded sx={{fontSize: '6vh' }} />,
    text: 'Search'
  },
  {
    href: '/collection',
    icon: <LibraryMusicRounded sx={{fontSize: '6vh' }} />,
    text: 'Your library'
  },
  {
    href: '/',
    icon: <DownloadForOfflineRounded sx={{fontSize: '6vh' }} />,
    text: 'Install App'
  }
]

function MobileWidget() {
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: '0.3rem',
        background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
      }}
    >
      <NowPlayingBar />
      <NavLink link={link} />
    </Stack>
  )
}

export default MobileWidget