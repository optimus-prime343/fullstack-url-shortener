import { z } from 'zod'

export const authSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
})
export type AuthPayload = z.infer<typeof authSchema>['body']
