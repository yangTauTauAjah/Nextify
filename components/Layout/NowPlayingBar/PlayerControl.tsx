import React from 'react'
import {
  Home,
  Search,
  LibraryMusic,
  DownloadForOfflineOutlined,
  Favorite,
  FavoriteBorder,
  PictureInPictureAlt,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  SkipPrevious,
  SkipNext,
  PlayCircle,
  StopCircle,
  Repeat,
  QueueMusic,
  DevicesOther,
  VolumeUp,
  VolumeOff,
  Launch
} from '@mui/icons-material';
import { Stack } from '@mui/material';

function PlayerControl() {
  return (
    <div style={{flexGrow: 1}}>
      <Stack direction='row' gap='1rem' alignItems='center'>
        <Shuffle />
        <SkipPrevious fontSize='large' />
        <PlayCircle fontSize='large' />
        <SkipNext fontSize='large' />
        <Repeat />
      </Stack>
      <div>
        <div>0:00</div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>59:59</div>
      </div>
    </div>
  )
}

export default PlayerControl