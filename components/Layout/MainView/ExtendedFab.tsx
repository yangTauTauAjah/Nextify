import { Fab } from '@mui/material'
import React from 'react'

const ExtendedFab = (props: { children?: string }) => (
  <Fab
    sx={{
      background: 'rgba(255,255,255,0.1)',
      paddingInline: '1rem',
      textTransform: 'unset',
      color: 'white',
      '&:hover': { background: 'rgba(255,255,255,0.2)' }
    }}
    size="small" variant="extended">
      {props.children}
  </Fab>
)

export default ExtendedFab