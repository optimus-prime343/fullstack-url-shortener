import type { OpenGraphMetaData, Url } from '@url-shortener/server'

export type ShortenedURL = Url & { openGraphMetaData: OpenGraphMetaData | null }
export interface ShortenedURLPaginatedResponse {
  nextPage: number | null
  prevPage: number | null
  shortenedURLs: ShortenedURL[]
  total: number
}
