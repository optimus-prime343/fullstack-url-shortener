import type { JSX } from 'solid-js'
import { createEffect } from 'solid-js'
import { createSignal } from 'solid-js'

import { getShortenedURLs } from '../../services/shorten-url-service'
import type { ShortenedURL } from '../../types/shortened-url'
import { useUser } from '../user'
import { ShortenURLContext } from './shorten-url-context'

export interface ShortenURLProviderProps {
  children: JSX.Element
}

export const ShortenURLProvider = (props: ShortenURLProviderProps) => {
  const { user } = useUser()
  const [totalInDB, setTotalInDB] = createSignal<number>(0)
  const [shortenedURLs, setShortenedURLs] = createSignal<ShortenedURL[]>([])
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [error, setError] = createSignal<string | undefined>(undefined)

  const fetchShortenedURLs = async (
    page?: number,
    cache?: boolean
  ): Promise<void> => {
    setIsLoading(true)
    try {
      const paginatedResponse = await getShortenedURLs(page, cache)
      setShortenedURLs([...paginatedResponse.shortenedURLs])
      if (paginatedResponse.total !== totalInDB()) {
        setTotalInDB(paginatedResponse.total)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  createEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (user()) {
        await fetchShortenedURLs()
      }
    })().catch(error => {
      console.log(error)
    })
  })
  return (
    <ShortenURLContext.Provider
      value={{ totalInDB, shortenedURLs, isLoading, error, fetchShortenedURLs }}
    >
      {props.children}
    </ShortenURLContext.Provider>
  )
}
