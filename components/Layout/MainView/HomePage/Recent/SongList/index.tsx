import React from 'react'
import Song from './Song'
import mock from '@/data/mock.json'
import { PlaylistObject } from '@/components/interfaces'

const Songs = mock.playlists.items

function SongList({playlists}: {playlists: PlaylistObject[]}) {
  return (
    <div
      style={{
        padding: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
        gap: '0.5rem',
        width: '100%'
      }}
    >
      {
        playlists.map(({id, name, images}) => (
          <Song key={id} title={name} image={images[0].url} href={`/playlist/${id}`} />
        ))
      }
    </div>
  )
}

export default SongList