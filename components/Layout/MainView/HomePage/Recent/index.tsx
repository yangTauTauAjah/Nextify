import React from 'react'
import Greeting from './Greeting'
import Header from './Header'
import SongList from './SongList'
import { Stack } from '@mui/material'



function Recent() {
  return (
    <Stack gap={2}>
      <Greeting />
      <Header />
      <SongList />
    </Stack>
  )
}

export default Recent