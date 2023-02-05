import '@/styles/globals.css'

import type { MantineProviderProps } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const theme = useMemo<MantineProviderProps['theme']>(
    () => ({
      primaryColor: 'indigo',
      colorScheme: 'dark',
    }),
    []
  )
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
