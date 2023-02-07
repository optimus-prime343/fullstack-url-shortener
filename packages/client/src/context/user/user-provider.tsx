import type { User } from '@url-shortener/server'
import type { Component, JSX } from 'solid-js'
import { onMount } from 'solid-js'
import { createSignal } from 'solid-js'

import { fetchUser } from '../../services/auth-service'
import { UserContext } from './user-context'

export interface UserProviderProps {
  children: JSX.Element
}
export const UserProvider: Component<UserProviderProps> = props => {
  const [user, setUser] = createSignal<User | undefined>(undefined)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [error, setError] = createSignal<string | undefined>(undefined)

  const refetchUser = async () => {
    setIsLoading(true)
    try {
      const user = await fetchUser()
      setUser(user)
      setIsLoading(false)
      setError(undefined)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  onMount(refetchUser)

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, error, refetchUser }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
