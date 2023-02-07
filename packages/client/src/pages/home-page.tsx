import type { Component } from 'solid-js'
import { Show } from 'solid-js'

import { ChooseAuthMethod } from '../components/auth/choose-auth-method'

const isLoggedIn = Math.random() > 0.5
export const HomePage: Component = () => {
  return (
    <Show
      when={isLoggedIn}
      fallback={
        <div class='flex min-h-screen items-center justify-center'>
          <ChooseAuthMethod />
        </div>
      }
    >
      <main />
    </Show>
  )
}
