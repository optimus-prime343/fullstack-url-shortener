import type { Component } from 'solid-js'
import { For } from 'solid-js'

import type { ShortenedURL } from '../../../../types/shortened-url'
import { ShortenURLItem } from '../shorten-url-item'

export interface ShortenURListProps {
  shortenedURLs: ShortenedURL[]
}
export const ShortenURList: Component<ShortenURListProps> = props => {
  return (
    <div class='space-y-2 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0'>
      <For each={props.shortenedURLs}>
        {shortenedURL => <ShortenURLItem shortenURL={shortenedURL} />}
      </For>
    </div>
  )
}
