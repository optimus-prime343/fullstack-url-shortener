import type { User } from '@url-shortener/server'
import type { ResourceReturn } from 'solid-js'
import { createResource } from 'solid-js'

import { fetchUser } from '../services/auth-service'

export const createUserResource = (): ResourceReturn<User | undefined> =>
  createResource<User | undefined>(fetchUser)
