import React from 'react'
import {
  Shuffle,
  SkipPrevious,
  SkipNext,
  PlayCircle,
  Repeat,
} from '@mui/icons-material';
import { Slider, Stack } from '@mui/material';
import CustomSlider from '@/components/CustomSlider';

function PlayerControl() {
  return (
    <Stack alignItems='center' justifyContent='space-between' width='33.33%'>
      <Stack direction='row' gap='1rem' alignItems='center'>
        <Shuffle />
        <SkipPrevious fontSize='large' />
        <PlayCircle fontSize='large' />
        <SkipNext fontSize='large' />
        <Repeat />
      </Stack>
      <Stack direction='row' gap='0.8rem' alignItems='center' width='100%'>
        <div>0:00</div>
        <CustomSlider style={{flexGrow: 1, width: '3rem'}} />
        <div>59:59</div>
      </Stack>
    </Stack>
  )
}

export default PlayerControl