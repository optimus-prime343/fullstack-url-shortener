import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'

import { ChooseAuthMethod } from '../components/auth/choose-auth-method'
import { ErrorView } from '../components/views/error-view'
import { LoadingView } from '../components/views/loading-view'
import { createUserResource } from '../resources/create-user-resource'

export const HomePage: Component = () => {
  const [user, { refetch: refetchUser }] = createUserResource()

  return (
    <Switch
      fallback={() => (
        <div class='flex min-h-screen items-center justify-center'>
          <ChooseAuthMethod />
        </div>
      )}
    >
      <Match when={user.state === 'ready' && user()}>
        <h1>User Loaded</h1>
      </Match>
      <Match when={user.state === 'refreshing' || user.state === 'pending'}>
        <LoadingView />
      </Match>
      <Match when={user.state === 'errored'}>
        <ErrorView
          description={(user.error as Error).message}
          onRetry={refetchUser}
        />
      </Match>
    </Switch>
  )
}
