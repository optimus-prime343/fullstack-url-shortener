import type { User } from '@url-shortener/server'
import { apiEndpoints } from '@url-shortener/shared'
import { AxiosError } from 'axios'

import { api } from '../lib/api'
import type { LoginPayload } from '../schemas/login-schema'
import type { RegisterPayload } from '../schemas/register-schema'
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../types/api-response'

export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const { data } = await api.get<
      ApiSuccessResponse<{ user: User | undefined }>
    >(apiEndpoints.auth.profile)
    return data.data?.user
  } catch (error) {
    if (error instanceof AxiosError<ApiErrorResponse>) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong.Please try again later')
  }
}
export const loginUser = async (loginPayload: LoginPayload): Promise<void> => {
  try {
    await api.post(apiEndpoints.auth.login, loginPayload)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong!')
  }
}
export const registerUser = async (registerPayload: RegisterPayload) => {
  try {
    await api.post(apiEndpoints.auth.register, registerPayload)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong.Please try again later')
  }
}
