import { DownloadForOfflineOutlined } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function InstallApp() {

  const Theme = useTheme()

  return (
    <Link href='/' legacyBehavior>
      <Box
        component='a'
        sx={{
          height: '3rem',
          flexShrink: 0,
          display: 'none',
          gap: '1rem',
          alignItems: 'center',
          [Theme.breakpoints.up('sm')]: {
            display: 'flex'
          }
        }}
      >
        <DownloadForOfflineOutlined fontSize="medium" />
        <div>Install App</div>
      </Box>
    </Link>
  )
}

export default InstallApp