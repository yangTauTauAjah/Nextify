import '@/styles/globals.css'
import { themeSettings } from '@/theme'
import { ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'

const Theme = createTheme(themeSettings)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}