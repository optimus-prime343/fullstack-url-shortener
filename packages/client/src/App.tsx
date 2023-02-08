import type { Component } from 'solid-js'
import { Toaster } from 'solid-toast'

import { ShortenURLProvider } from './context/shorten-url'
import { UserProvider } from './context/user'
import { HomePage } from './pages/home-page'

const App: Component = () => {
  return (
    <UserProvider>
      <ShortenURLProvider>
        <Toaster position='top-center' />
        <HomePage />
      </ShortenURLProvider>
    </UserProvider>
  )
}

export default App
