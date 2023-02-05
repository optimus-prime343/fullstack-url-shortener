import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET_KEY: z.string(),
  FRONTEND_URL: z.string(),
  NODE_ENV: z.enum(['production', 'development', 'testing']),
})
const parseConfig = (): z.infer<typeof configSchema> => {
  try {
    const config = configSchema.parse(process.env)
    return config
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message)
    }
    throw new Error('Something went wrong')
  }
}

export const config = parseConfig()
