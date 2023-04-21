import React from 'react'
import {
  Shuffle,
  SkipPrevious,
  SkipNext,
  PlayCircle,
  Repeat,
} from '@mui/icons-material';
import { Box, Slider, Stack, useTheme } from '@mui/material';
import CustomSlider from '@/components/CustomSlider';

function PlayerControl() {

  const Theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        [Theme.breakpoints.up('sm')]: {
          justifyContent: 'space-between',
          width: '33.33%'
        }
      }}
    >
      <Stack
        direction='row'
        gap='1rem'
        alignItems='center'
      >
        <Shuffle
          sx={{
            display: 'none',
            [Theme.breakpoints.up('sm')]: {
              display: 'flex'
            }
          }}
        />
        <SkipPrevious
          sx={{
            display: 'none',
            [Theme.breakpoints.up('sm')]: {
              display: 'flex'
            }
          }} fontSize='large'
        />
        <PlayCircle fontSize='large' />
        <SkipNext
          sx={{
            display: 'none',
            [Theme.breakpoints.up('sm')]: {
              display: 'flex'
            }
          }} fontSize='large'
        />
        <Repeat
          sx={{
            display: 'none',
            [Theme.breakpoints.up('sm')]: {
              display: 'flex'
            }
          }}
        />
      </Stack>
      <Stack
        sx={{
          display: 'none',
          [Theme.breakpoints.up('sm')]: {
            display: 'flex'
          }
        }}
        direction='row'
        gap='0.8rem'
        alignItems='center'
        width='100%'
      >
        <div>0:00</div>
        <CustomSlider style={{ flexGrow: 1, width: '3rem' }} />
        <div>59:59</div>
      </Stack>
    </Box>
  )
}

export default PlayerControl