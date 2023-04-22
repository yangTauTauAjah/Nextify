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
        {
          [0, 1, 2].map((e, i) => (
            <Item key={i} image='' title='test' href='' description={<p>Test, test, test</p>} />
          ))
        }
      </Section>
      <Section title="Discover">
        {
          [0, 1, 2].map((e, i) => (
            <Item key={i} image='' title='test' href='' description={<p>Test, test, test</p>} />
          ))
        }
      </Section>
      <Section title="Focus">
        {
          [0, 1, 2].map((e, i) => (
            <Item key={i} image='' title='test' href='' description={<p>Test, test, test</p>} />
          ))
        }
      </Section>
      <Section title="Spotify Playlists">
        {
          [0, 1, 2].map((e, i) => (
            <Item key={i} image='' title='test' href='' description={<p>Test, test, test</p>} />
          ))
        }
      </Section>
    </Stack>
  )
}

export default MainView