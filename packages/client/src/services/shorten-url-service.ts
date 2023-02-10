import { apiEndpoints } from '@url-shortener/shared'
import { AxiosError } from 'axios'

import { api } from '../lib/api'
import type {
  ApiErrorResponse,
  ApiSuccessResponse
} from '../types/api-response'
import type {
  ShortenedURL,
  ShortenedURLPaginatedResponse
} from '../types/shortened-url'

const shortenedURLCache = new Map<string, ShortenedURLPaginatedResponse>()

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
export const getShortenedURLs = async (
  page = 1,
  cache = false
): Promise<ShortenedURLPaginatedResponse> => {
  const url = `${apiEndpoints.shortenUrl.base}?page=${page}`
  if (cache && shortenedURLCache.has(url)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return shortenedURLCache.get(url)!
  }
  try {
    const { data } = await api.get<
      ApiSuccessResponse<ShortenedURLPaginatedResponse>
    >(url)
    shortenedURLCache.set(url, data.data)
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
