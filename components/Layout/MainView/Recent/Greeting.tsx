import { History, NotificationsNone, Settings } from '@mui/icons-material'
import React from 'react'

function Greeting() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Good morning</h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NotificationsNone sx={{ fontSize: '2rem' }} />
        <History sx={{ fontSize: '2rem' }} />
        <Settings sx={{ fontSize: '2rem' }} />
      </div>
    </div>
  )
}

export default Greeting