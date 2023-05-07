import React from 'react'
import Item from './Item'
import { Box } from '@mui/material'

interface CollectionInterface {
  children: any[]
}

function Collection({ children }: CollectionInterface) {
  return (
    <Box
      sx={{
        paddingBlock: '1rem',
        display: 'flex',
        width: '100%',
        overflow: 'auto',
        gap: '1rem',
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0,0,0,0)"
        },
        "&:hover::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,.1)"
        }
      }}
    >
      {children}
    </Box>
  )
}

export default Collection