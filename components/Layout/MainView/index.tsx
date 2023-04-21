import { Box, Stack } from '@mui/material'
import React from 'react'
import Recent from './Recent'
import Section from './Section'
import Item from './Section/Collection/Item'



function MainView() {
  return (
    <Stack sx={{ gap: '1.5rem', padding: '1rem', marginBottom: '10rem' }}>
      <Recent />
      <Section title="Your top mixes">
        <Item image='' title='test' href=''><p>Test, test, test</p></Item>
        <Item image='' title='test' href=''><p>Test, test, test</p></Item>
        <Item image='' title='test' href=''><p>Test, test, test</p></Item>
      </Section>
    </Stack>
  )
}

export default MainView