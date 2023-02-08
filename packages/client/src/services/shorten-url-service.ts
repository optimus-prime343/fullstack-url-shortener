import type { Url } from '@url-shortener/server'
import { apiEndpoints } from '@url-shortener/shared'
import { AxiosError } from 'axios'

import { api } from '../lib/api'
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from '../types/api-response'

export const shortenURL = async (url: string): Promise<Url> => {
  try {
    const { data } = await api.post<ApiSuccessResponse<Url>>(
      apiEndpoints.shortenUrl.base,
      { originalURL: url }
    )
    return data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong')
  }
}
export const getShortenedURLs = async (): Promise<Url[]> => {
  try {
    const { data } = await api.get<
      ApiSuccessResponse<{ shortenedURLs: Url[] }>
    >(apiEndpoints.shortenUrl.base)
    return data.data.shortenedURLs
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong')
  }
}
