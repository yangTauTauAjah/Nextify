import { Box, Fab, Stack, styled } from '@mui/material'
import React from 'react'
import Recent from './Recent'
import Section from './Section'
import Item from './Section/Collection/Item'
import { Typography } from '@mui/material/styles/createTypography'
import TopList from '@/data/categories/toplist.json'
import Discover from '@/data/featured_6.json'
import Country from '@/data/categories/Country.json'
import Indie from '@/data/categories/Indie.json'
import Gaming from '@/data/categories/Gaming.json'
import Mood from '@/data/categories/Mood.json'
import Pop from '@/data/categories/Pop.json'
import Artist from '@/data/recommendations/artists.json'

const PStyle = ({ typography }: { typography: Typography }) => ({
  fontSize: typography.subtitle1.fontSize,
  fontWeight: typography.fontWeightRegular,
  color: typography.subtitle1.color,
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  WebkitLineClamp: '2',
  overflow: 'hidden'
})

const Collection = ({ title, type, collection }: { title: string, type?: "playlist" | "artist", collection: any[] } ) => (
  <Section title={title}>
    {
      collection.map(({ id, name, owner, description, images }) => (
        <Item
          key={id}
          image={images[0].url}
          title={name}
          href={`/playlist/${id}`}
          type={type || "playlist"}
          description={
            <Box component='p' sx={PStyle}>
              {description || type === 'playlist' ? `By ${owner?.id}` : 'Artist'}
            </Box>
          }
        />
      ))
    }
  </Section>
)

function MainView() {
  return (
    <Stack sx={{ gap: '1.5rem', padding: '1rem', marginBottom: '10rem' }}>
      <Recent />
      <Collection title="Top List" collection={TopList.playlists.items} />
      <Collection title="Discover" collection={Discover.playlists.items} />
      <Collection title="Country" collection={Country.playlists.items} />
      <Collection title="Indie" collection={Indie.playlists.items} />
      <Collection title="Gaming" collection={Gaming.playlists.items} />
      <Collection title="Mood" collection={Mood.playlists.items} />
      <Collection title="Pop" collection={Pop.playlists.items} />
      <Collection title="Artist" type='artist' collection={Artist.artists} />
    </Stack>
  )
}

export default MainView