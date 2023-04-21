import { Box, useTheme } from "@mui/material";
import Link from "next/link";

export default function PlayLists(props: { list: Array<{ href: string, text: string }> }) {

  const Theme = useTheme()

  return (
    <Box sx={{
      display: 'none',
      fontSize: '1rem',
      overflow: 'auto',
      marginTop: '1rem',
      marginBottom: 'auto',
      '&::-webkit-scrollbar': {
        width: '10px',
        background: 'rgba(0,0,0,0)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,.0)',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,.3)',
      },
      [Theme.breakpoints.up('sm')]: {
        display: 'unset'
      }
    }} >{
        props.list.map((e, i) => (
          <Link key={i} href={e.href}>
            <div style={{ height: '2rem', lineHeight: '1.6' }}>{e.text}</div>
          </Link>
        ))
      }</Box>
  )
}