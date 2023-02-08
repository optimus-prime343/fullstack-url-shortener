import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'

import { ChooseAuthMethod } from '../components/auth/choose-auth-method'
import { ShortenURLView } from '../components/auth/shorten-url/shorten-url-view'
import { ErrorView } from '../components/views/error-view'
import { LoadingView } from '../components/views/loading-view'
import { useUser } from '../context/user'

export const HomePage: Component = () => {
  const { user, isLoading, error } = useUser()
  return (
    <Switch
      fallback={() => (
        <div class='flex min-h-screen items-center justify-center'>
          <ChooseAuthMethod />
        </div>
      )}
    >
      <Match when={user()}>
        <ShortenURLView />
      </Match>
      <Match when={isLoading()}>
        <LoadingView />
      </Match>
      <Match when={error()}>
        <ErrorView description={error()} />
      </Match>
    </Switch>
  )
}
