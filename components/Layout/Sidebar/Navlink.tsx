import { Box } from "@mui/material";
import Link from "next/link";


export default function NavLink(props: { link: Array<{ href: string, icon: React.ReactNode, text: string }>, style?: any }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        ...props.style
      }}
    >{
        props.link.map((e, i) => (
          <Link key={i} href={e.href} legacyBehavior>
            <a style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {e.icon}
              <p>{e.text}</p>
            </a>
          </Link>
        ))
      }</Box>
  )
}