import { z } from 'zod'

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(value => passwordRegex.test(value), {
    message: 'Please enter a strong password',
  }),
})
export type RegisterPayload = z.infer<typeof registerSchema>
