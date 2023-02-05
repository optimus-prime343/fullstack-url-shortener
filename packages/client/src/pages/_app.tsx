import type { MantineProviderProps } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'

import { GetStartedModal } from '../components/get-started-modal'
import { modalKeys } from '../constants/modal-keys'

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
      <ModalsProvider
        modalProps={{ centered: true }}
        modals={{ [modalKeys.getStartedModal]: GetStartedModal }}
      >
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  )
}
