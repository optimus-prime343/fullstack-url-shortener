import type { Component } from 'solid-js'

import { ShortenURLForm } from '../shorten-url-form'

export const ShortenURLView: Component = () => {
  return (
    <div class='container my-24'>
      <ShortenURLForm />
    </div>
  )
}
