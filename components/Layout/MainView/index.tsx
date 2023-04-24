import { Box, Stack } from '@mui/material'
import React from 'react'
import Recent from './Recent'
import Section from './Section'
import Item from './Section/Collection/Item'
import TopList from '@/data/categories/toplist.json'
import Discover from '@/data/featured_6.json'
import { Typography } from '@mui/material/styles/createTypography'

const PStyle = ({typography}: {typography: Typography}) => ({
  fontSize: typography.subtitle1.fontSize,
  fontWeight: typography.fontWeightRegular,
  color: typography.subtitle1.color,
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  WebkitLineClamp: '2',
  overflow: 'hidden'
})

function MainView() {
  return (
    <Stack sx={{ gap: '1.5rem', padding: '1rem', marginBottom: '10rem' }}>
      <Recent />
      <Section title="Top List">
        {
          TopList.playlists.items.map(({id, name, description, images }) => (
            <Item
              key={id}
              image={images[0].url}
              title={name}
              href={`/playlist/id`}
              description={
                <Box component='p' sx={PStyle}>
                  {description}
                </Box>
              }
            />
          ))
        }
      </Section>
      <Section title="Discover">
        {
          Discover.playlists.items.map(({id, name, description, images }) => (
            <Item
              key={id}
              image={images[0].url}
              title={name}
              href={`/playlist/${id}`}
              description={
                <Box component='p' sx={PStyle}>
                  {description}
                </Box>
              }
            />
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