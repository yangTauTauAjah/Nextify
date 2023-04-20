import '@/styles/globals.css'
import { themeSettings } from '@/theme'
import { ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'
import { store } from '@/components/store'
import { Provider } from 'react-redux'

const Theme = createTheme(themeSettings)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}