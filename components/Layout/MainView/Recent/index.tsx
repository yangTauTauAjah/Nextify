import React from 'react'
import Greeting from './Greeting'
import Header from './Header'
import SongList from './SongList'



function Recent() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Greeting />
      <Header />
      <SongList />
    </div>
  )
}

export default Recent