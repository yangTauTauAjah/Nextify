import React from 'react'
import Song from './Song'
import mock from '@/data/mock.json'

const Songs = mock.playlists.items

function SongList() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
        gap: '0.5rem',
        width: '100%'
      }}
    >
      {
        Songs.map(({id, name, images}) => (
          <Song key={id} title={name} image={images[0].url} href={`/playlist/${id}`} />
        ))
      }
    </div>
  )
}

export default SongList