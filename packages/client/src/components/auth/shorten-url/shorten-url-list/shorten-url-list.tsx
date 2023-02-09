import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { createEffect } from 'solid-js'
import { For } from 'solid-js'

import { useShortenURL } from '../../../../context/shorten-url'
import type { ShortenedURL } from '../../../../types/shortened-url'
import { ShortenURLItem } from '../shorten-url-item'

//! FIX INFINITE RERENDERS

export interface ShortenURListProps {
  shortenedURLs: ShortenedURL[]
}

export const ShortenURList: Component<ShortenURListProps> = props => {
  const { fetchShortenedURLs } = useShortenURL()

  const [lastItemRef, setLastItemRef] = createSignal<
    HTMLDivElement | undefined
  >(undefined)
  const [page, setPage] = createSignal<number>(1)

  const isItemLastInlist = (item: ShortenedURL) => {
    return props.shortenedURLs[props.shortenedURLs.length - 1].id === item.id
  }

  createEffect(() => {
    if (lastItemRef() === undefined) return
    const callback = async (
      entries: IntersectionObserverEntry[],
      _observer?: IntersectionObserverInit
    ) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const nextPage = await fetchShortenedURLs(page() + 1)
          if (nextPage === undefined) return
          setPage(nextPage)
        }
      }
    }
    const intersectionObserver = new IntersectionObserver(callback)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    intersectionObserver.observe(lastItemRef()!)
  })
  return (
    <div class='space-y-2 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0'>
      <For each={props.shortenedURLs}>
        {shortenedURL => (
          <ShortenURLItem
            ref={ref => {
              if (isItemLastInlist(shortenedURL)) {
                setLastItemRef(ref)
              }
            }}
            shortenURL={shortenedURL}
          />
        )}
      </For>
    </div>
  )
}
