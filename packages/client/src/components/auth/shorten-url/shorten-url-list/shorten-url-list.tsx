import type { Component } from 'solid-js'
import { For } from 'solid-js'

import type { ShortenedURL } from '../../../../types/shortened-url'
import { ShortenURLItem } from '../shorten-url-item'

export interface ShortenURListProps {
  shortenedURLs: ShortenedURL[]
}
export const ShortenURList: Component<ShortenURListProps> = props => {
  return (
    <div class='grid grid-cols-3 gap-4'>
      <For each={props.shortenedURLs}>
        {shortenedURL => <ShortenURLItem shortenURL={shortenedURL} />}
      </For>
    </div>
  )
}
