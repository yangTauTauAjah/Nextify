import Image from 'next/image'
import React from 'react'

const Song = () => (
  <div
    style={{
      overflow: 'hidden',
      display: 'flex',
      gap: '0.3rem',
      alignItems: 'center',
      height: '4rem',
      borderRadius: '0.3rem',
      background: 'rgba(255,255,255,0.1)'
    }}
  >
    <div style={{height: '100%'}}>
      <Image src="" alt="image" />
    </div>
    <p>asjhdoahfjoiajfi</p>
  </div>
)

export default Song