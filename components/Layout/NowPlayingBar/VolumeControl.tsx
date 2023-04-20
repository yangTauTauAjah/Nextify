import React from 'react'
import {
  QueueMusic,
  DevicesOther,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';
import { Box, Slider, Stack } from '@mui/material';
import CustomSlider from '@/components/CustomSlider';

function VolumeControl() {
  return (
    <Stack width='33.33%' justifyContent='flex-end' direction='row' gap='1rem'>
      <QueueMusic />
      <DevicesOther />
      <Stack width='50%' direction='row' gap='0.5rem' alignItems='center'>
        <VolumeUp />
        <CustomSlider style={{width: '100%'}} />
      </Stack>
    </Stack >
  )
}

export default VolumeControl