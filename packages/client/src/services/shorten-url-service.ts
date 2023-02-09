import { apiEndpoints } from '@url-shortener/shared'
import { AxiosError } from 'axios'

import { api } from '../lib/api'
import type {
  ApiErrorResponse,
  ApiSuccessResponse
} from '../types/api-response'
import type { ShortenedURL } from '../types/shortened-url'

export const shortenURL = async (url: string): Promise<ShortenedURL> => {
  try {
    const { data } = await api.post<ApiSuccessResponse<ShortenedURL>>(
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
export const getShortenedURLs = async (): Promise<ShortenedURL[]> => {
  try {
    const { data } = await api.get<
      ApiSuccessResponse<{ shortenedURLs: ShortenedURL[] }>
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
export const deleteShortenedURL = async (id: string): Promise<string> => {
  try {
    const { data } = await api.delete<ApiSuccessResponse<unknown>>(
      apiEndpoints.shortenUrl.delete.replace(':id', id)
    )
    return data.message ?? 'URL deleted'
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        (error as AxiosError<ApiErrorResponse>).response?.data.message
      )
    }
    throw new Error('Something went wrong.')
  }
}
