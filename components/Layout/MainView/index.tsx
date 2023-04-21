import { Box } from '@mui/material'
import React from 'react'
import Header from './Recent'
import Image from 'next/image'
import Greeting from './Recent/Greeting'
import StickyElement from './Recent/Header'
import Recent from './Recent'



function MainView() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Recent />
    </Box>
  )
}

export default MainView