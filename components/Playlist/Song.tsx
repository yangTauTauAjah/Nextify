import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { ArtistObject, ImageObject, TrackObject } from "../stateSlice/SpotifyAPI/interfaces";
import Link from "next/link";
import { Box, styled } from "@mui/material";

const P = styled('p')(({ theme }) => ({
  background: theme.typography.subtitle1.color,
  borderRadius: '3px',
  padding: '3px',
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  color: 'rgba(0,0,0,.5)'
}))

const ArtistNameComponent = styled(Link)(({ theme }) => ({
  padding: '3px',
  lineHeight: theme.typography.subtitle1.fontSize,
  fontSize: theme.typography.subtitle1.fontSize,
  color: theme.typography.subtitle1.color
}))

export default function Song({ track }: { track: TrackObject }) {
  return (
    <Box style={{ display: 'flex', height: '3rem', gap: '1rem', alignItems: 'center' }}>
      <div style={{ aspectRatio: '1', height: '100%' }}>
        <Image src={track.album.images[0].url} fill style={{ objectFit: 'contain' }} alt='image' />
      </div>
      <div style={{ marginRight: 'auto' }}>
        <Link href={`/track/${track.id}`}>{track.name}</Link>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          {track.explicit && <P>LYRICS</P>}
          {
            track.artists.map((e, i) => (
              <ArtistNameComponent
                key={i}
                href={`/artist/${e.id}`}
              >
                {e.name}
              </ArtistNameComponent>
            ))
          }
        </div>
      </div>
      <MoreVert />
    </Box>
  )
}