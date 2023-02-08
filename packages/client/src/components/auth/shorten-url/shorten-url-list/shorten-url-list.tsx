import type { Url } from '@url-shortener/server'
import type { Component } from 'solid-js'
import { For } from 'solid-js'

import { ShortenURLItem } from '../shorten-url-item'

export interface ShortenURListProps {
  shortenedURLs: Url[]
}
export const ShortenURList: Component<ShortenURListProps> = props => {
  return (
    <div class='grid grid-cols-4 gap-4'>
      <For each={props.shortenedURLs}>
        {shortenedURL => <ShortenURLItem shortenURL={shortenedURL} />}
      </For>
    </div>
  )
}
