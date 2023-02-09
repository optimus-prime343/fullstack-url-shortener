import { z } from 'zod'

export const createShortUrlSchema = z.object({
  body: z.object({
    originalURL: z.string().url(),
  }),
})
export const getShortenedUrlSchema = z.object({
  query: z.object({
    perPage: z.number({ coerce: true }).default(3),
    page: z.number({ coerce: true }).default(1),
  }),
})
export const deleteShortenedURLSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
export type CreateShortURLPayload = z.infer<typeof createShortUrlSchema>['body']
export type GetShortenedURLsQuery = z.infer<
  typeof getShortenedUrlSchema
>['query']
export type DeleteShortenedURLPayload = z.infer<
  typeof deleteShortenedURLSchema
>['params']
