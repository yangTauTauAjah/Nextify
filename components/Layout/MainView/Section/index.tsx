import React from 'react'
import Collection from './Collection'
import { Box } from '@mui/material';

interface SectionInterface {
  title: string;
  children: any | any[]
}

function Section({ title, children }: SectionInterface) {
  return (
    <Box
      component="section"
    >
      <h1>{title}</h1>
      <Collection>{children}</Collection>
    </Box>
  )
}

export default Section