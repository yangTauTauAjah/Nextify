import { Stack } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface ItemInterface {
  type?: 'playlist' | 'artist';
  href: string;
  image: string;
  title: string;
  children: any | any[];
}

const Thumbnail = ({ image, style }: { image: string, style?: any }) => (
  <div style={{
    aspectRatio: '1',
    width: '10rem',
    ...style
  }}>
    <Image src={image} alt="image" />
  </div>
)

function Item({ type = 'playlist', href, title, image, children }: ItemInterface) {
  return (
    <Link href={href}>
      <Stack
        sx={{
          padding: '1rem',
          gap: '1rem',
          borderRadius: '0.3rem',
          transition: 'background 100ms ease-in-out',
          background: 'rgba(255,255,255,0.05)',
          '&:hover': {
            background: 'rgba(255,255,255,0.1)',
          }
        }}
      >
        <Thumbnail image={image} style={{ borderRadius: type === 'artist' ? '100%' : '5px' }} />
        <h3>{title}</h3>
        {children}
      </Stack>
    </Link>
  )
}

export default Item