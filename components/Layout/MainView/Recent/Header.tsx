import React from 'react'
import ExtendedFab from '../ExtendedFab'

function StickyElement() {
  return (
    <div style={{position: 'sticky', top: '0', display: 'flex', gap: '0.5rem', paddingBlock: '0.5rem'}}>
      <ExtendedFab>Music</ExtendedFab>
      <ExtendedFab>Podcast & Shows</ExtendedFab>
    </div>
  )
}

export default StickyElement