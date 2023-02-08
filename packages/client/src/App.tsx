import type { Component } from 'solid-js'

import { ShortenURLProvider } from './context/shorten-url'
import { UserProvider } from './context/user'
import { HomePage } from './pages/home-page'

const App: Component = () => {
  return (
    <UserProvider>
      <ShortenURLProvider>
        <HomePage />
      </ShortenURLProvider>
    </UserProvider>
  )
}

export default App
