import type { OpenGraphMetaData, Url } from '@url-shortener/server'

export type ShortenedURL = Url & { openGraphMetaData: OpenGraphMetaData }
