import { Slider } from '@mui/material'
import React from 'react'

function CustomSlider(props: { style: any }) {
  return (
    <Slider
      sx={{ 
        ...props.style,
        '& .MuiSlider-thumb': { 
          width: '0.8rem',
          height: '0.8rem' } 
        }}
      size="medium"
      defaultValue={70}
      valueLabelDisplay="auto"
    />
  )
}

export default CustomSlider