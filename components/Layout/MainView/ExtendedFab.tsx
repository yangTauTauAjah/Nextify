import { Fab } from '@mui/material'
import React from 'react'

const FabStyle = {
  background: 'rgba(255,255,255,0.1)',
  paddingInline: '1rem',
  textTransform: 'unset',
  color: 'white',
  '&:hover': { background: 'rgba(255,255,255,0.2)' }
}

const ExtendedFab = ({ children, style }: { children: string, style: any }) => (
  <Fab sx={{...FabStyle, ...style}} size="small" variant="extended">{children}</Fab>
)

export default ExtendedFab