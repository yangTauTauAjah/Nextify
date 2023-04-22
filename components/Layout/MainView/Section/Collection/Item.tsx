import { Stack } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface ItemInterface {
  type?: 'playlist' | 'artist';
  href: string;
  image: string;
  title: string;
  description: React.ReactNode | React.ReactNode[];
}

const ThumbnailStyle = {
  aspectRatio: '1',
  width: '10rem',
}

const ItemStyle = {
  padding: '1rem',
  gap: '1rem',
  borderRadius: '0.3rem',
  transition: 'background 100ms ease-in-out',
  background: 'rgba(255,255,255,0.05)',
  '&:hover': {
    background: 'rgba(255,255,255,0.1)',
  }
}

function Item({ type = 'playlist', href, title, image, description }: ItemInterface) {
  return (
    <Link href={href}>
      <Stack sx={{...ItemStyle, fontWeight: (theme) => theme.typography.fontWeightLight}}>
        <div
          style={{
            ...ThumbnailStyle,
            borderRadius: type === 'artist' ? '100%' : '5px'
          }}
        >
          <Image src={image} alt="image" />
        </div>
        <h3>{title}</h3>
        {description}
      </Stack>
    </Link>
  )
}

export default Item