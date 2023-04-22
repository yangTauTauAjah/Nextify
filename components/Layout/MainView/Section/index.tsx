import React from 'react'
import Collection from './Collection'
import { Box } from '@mui/material';

interface SectionInterface {
  title: string;
  style?: any;
  children: any | any[]
}

function Section({ title, style, children }: SectionInterface) {
  return (
    <Box sx={style} component="section">
      <h1>{title}</h1>
      <Collection>{children}</Collection>
    </Box>
  )
}

export default Section