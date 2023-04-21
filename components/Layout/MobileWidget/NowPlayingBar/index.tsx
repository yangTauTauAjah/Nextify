import { DevicesOther, FavoriteBorder, PlayCircle } from '@mui/icons-material'
import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function NowPlayingBar() {
  return (
    <Box 
      sx={{
        position: 'relative',
        display: 'flex', 
        gap: '1rem',
        alignItems: 'center',
        padding: '0.5rem',
        height: '4rem',
        background: '#00aa22',
        borderRadius: '0.5rem',
        fontSize: '0.7rem'
      }}
    >
      <div style={{display: 'flex', marginRight: 'auto'}}>
        <div style={{height: '100%'}}>
          <Image  style={{aspectRatio: '1', objectFit: 'cover' }} src="" alt="image"></Image>
        </div>
        <div>
          <p style={{fontWeight: '700'}}>Song name</p>
          <p style={{marginTop: '0.3rem'}}>song by</p>
        </div>
      </div>
      <DevicesOther sx={{fontSize: '2rem'}} />
      <FavoriteBorder sx={{fontSize: '2rem'}} />
      <PlayCircle sx={{fontSize: '2rem'}} />
      <span
        style={{
          position: 'absolute', 
          left: '50%', 
          bottom: '0', 
          width: '95%', 
          height: '3px',
          background: 'rgba(255,255,255,0.3)',
          transform: 'translateX(-50%)'
        }}
      >
        <span style={{display: 'block', background: 'white', width: '10%', height: '100%',}}></span>
      </span>
    </Box>
  )
}

export default NowPlayingBar