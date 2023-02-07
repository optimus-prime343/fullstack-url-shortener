import type { User } from '@url-shortener/server'
import type { Accessor, Setter } from 'solid-js'
import { useContext } from 'solid-js'
import { createContext } from 'solid-js'

export interface IUserContext {
  user: Accessor<User | undefined>
  isLoading: Accessor<boolean>
  error: Accessor<string | undefined>
  setUser: Setter<User>
  refetchUser: () => Promise<void>
}
export const UserContext = createContext<IUserContext>()

export const useUser = (): IUserContext => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
