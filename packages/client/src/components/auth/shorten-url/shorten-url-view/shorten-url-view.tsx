import type { Component } from 'solid-js'

import { useShortenURL } from '../../../../context/shorten-url'
import { ShortenURLForm } from '../shorten-url-form'
import { ShortenURList } from '../shorten-url-list'

export const ShortenURLView: Component = () => {
  const { shortenedURLs } = useShortenURL()
  return (
    <div class='my-4 p-2 md:mx-auto md:max-w-xl lg:container lg:my-24 lg:py-0'>
      <ShortenURLForm />
      <span class='my-6 block' />
      <ShortenURList shortenedURLs={shortenedURLs()} />
    </div>
  )
}
