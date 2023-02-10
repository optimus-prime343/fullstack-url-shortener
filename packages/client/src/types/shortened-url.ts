import type { OpenGraphMetaData, Url } from '@url-shortener/server'

export type ShortenedURL = Url & { openGraphMetaData: OpenGraphMetaData }
export interface ShortenedURLPaginatedResponse {
  nextPage: number | null
  prevPage: number | null
  shortenedURLs: ShortenedURL[]
  total: number
}
