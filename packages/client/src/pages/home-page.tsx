import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'

import { ChooseAuthMethod } from '../components/auth/choose-auth-method'
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
        <h1>User Loaded</h1>
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
