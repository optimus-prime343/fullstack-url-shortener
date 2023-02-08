import type { Component } from 'solid-js'

import { useShortenURL } from '../../../../context/shorten-url'
import { ShortenURLForm } from '../shorten-url-form'
import { ShortenURList } from '../shorten-url-list'

export const ShortenURLView: Component = () => {
  const { shortenedURLs } = useShortenURL()
  return (
    <div class='container my-24'>
      <ShortenURLForm />
      <span class='my-6 block' />
      <ShortenURList shortenedURLs={shortenedURLs()} />
    </div>
  )
}
