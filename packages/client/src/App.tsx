import type { Component } from 'solid-js'

import { UserProvider } from './context/user'
import { HomePage } from './pages/home-page'

const App: Component = () => {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  )
}

export default App
