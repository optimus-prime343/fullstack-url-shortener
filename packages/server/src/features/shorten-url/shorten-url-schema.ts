import { z } from 'zod'

export const createShortUrlSchema = z.object({
  body: z.object({
    originalURL: z.string().url(),
  }),
})
export type CreateShortURLPayload = z.infer<typeof createShortUrlSchema>['body']
