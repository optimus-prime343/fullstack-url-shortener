import type { Accessor } from 'solid-js'
import { useContext } from 'solid-js'
import { createContext } from 'solid-js'

import type { ShortenedURL } from '../../types/shortened-url'

export interface IShortenURLContext {
  shortenedURLs: Accessor<ShortenedURL[]>
  isLoading: Accessor<boolean>
  error: Accessor<string | undefined>
  fetchShortenedURLs: (page?: number) => Promise<number | undefined>
}

export const ShortenURLContext = createContext<IShortenURLContext | undefined>(
  undefined
)
export const useShortenURL = (): IShortenURLContext => {
  const context = useContext(ShortenURLContext)
  if (context === undefined) {
    throw new Error('useShortenURL must be used within ShortenURLProvider')
  }
  return context
}
