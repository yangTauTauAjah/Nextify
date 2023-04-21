import { Box, useTheme } from "@mui/material";
import Link from "next/link";


export default function NavLink(props: { link: Array<{ href: string, icon: React.ReactNode, text: string }> }) {

  const Theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        [Theme.breakpoints.up('sm')]: {
          flexDirection: 'column',
          gap: '1rem',
          borderBottom: 'solid 1px rgba(255,255,255,.1)',
          paddingBottom: '1rem',
          paddingInline: '1rem'
        }
      }}
    >{
        props.link.map((e, i) => (
          <Link key={i} href={e.href} legacyBehavior>
            <Box
              component="a"
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: '0.5rem', 
                gap: '0.3rem', 
                alignItems: 'center', 
                [Theme.breakpoints.up('sm')]: { 
                  flexDirection: 'row', 
                  gap: '1rem', 
                  fontSize: '1rem' 
                } 
              }}
            >
              {e.icon}
              <p>{e.text}</p>
            </Box>
          </Link>
        ))
      }</Box>
  )
}