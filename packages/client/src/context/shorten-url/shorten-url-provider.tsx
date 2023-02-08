import type { Url } from '@url-shortener/server'
import type { JSX } from 'solid-js'
import { createEffect } from 'solid-js'
import { createSignal } from 'solid-js'

import { getShortenedURLs } from '../../services/shorten-url-service'
import { useUser } from '../user'
import { ShortenURLContext } from './shorten-url-context'

export interface ShortenURLProviderProps {
  children: JSX.Element
}
export const ShortenURLProvider = (props: ShortenURLProviderProps) => {
  const { user } = useUser()
  const [shortenedURLs, setShortenedURLs] = createSignal<Url[]>([])
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [error, setError] = createSignal<string | undefined>(undefined)

  const refetchShortenedURLs = async () => {
    setIsLoading(true)
    try {
      const apiShortenedURLs = await getShortenedURLs()
      setShortenedURLs(apiShortenedURLs)
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
        await refetchShortenedURLs()
      }
    })().catch(error => {
      console.log(error)
    })
  })
  return (
    <ShortenURLContext.Provider
      value={{ shortenedURLs, isLoading, error, refetchShortenedURLs }}
    >
      {props.children}
    </ShortenURLContext.Provider>
  )
}
