import { apiEndpoints } from '@url-shortener/shared'
import { Router } from 'express'

import { validateResource } from '../../shared/middlewares/validate-resource.js'
import { login, register } from './auth-controller.js'
import { authSchema } from './auth-schema.js'

const authRouter = Router()

authRouter.post(apiEndpoints.auth.login, validateResource(authSchema), login)
authRouter.post(
  apiEndpoints.auth.register,
  validateResource(authSchema),
  register,
)

export default authRouter
