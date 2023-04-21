import React from 'react'
import Song from './Song'

function SongList() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
        width: '100%'
      }}
    >
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
      <Song />
    </div>
  )
}

export default SongList