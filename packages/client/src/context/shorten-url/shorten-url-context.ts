import type { Url } from '@url-shortener/server'
import type { Accessor } from 'solid-js'
import { useContext } from 'solid-js'
import { createContext } from 'solid-js'

export interface IShortenURLContext {
  shortenedURLs: Accessor<Url[]>
  isLoading: Accessor<boolean>
  error: Accessor<string | undefined>
  refetchShortenedURLs: () => Promise<void>
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
