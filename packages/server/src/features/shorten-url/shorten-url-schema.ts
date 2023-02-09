import { z } from 'zod'

export const createShortUrlSchema = z.object({
  body: z.object({
    originalURL: z.string().url(),
  }),
})
export const deleteShortenedURLSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})
export type CreateShortURLPayload = z.infer<typeof createShortUrlSchema>['body']
export type DeleteShortenedURLPayload = z.infer<
  typeof deleteShortenedURLSchema
>['params']
