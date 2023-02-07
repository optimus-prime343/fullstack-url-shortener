import { apiEndpoints } from '@url-shortener/shared'
import { Router } from 'express'

import { validateResource } from '../../shared/middlewares/validate-resource.js'
import { login, profile, register } from './auth-controller.js'
import { checkIsAuthenticated } from './auth-middlewares.js'
import { authSchema } from './auth-schema.js'

const authRouter = Router()

authRouter.post(apiEndpoints.auth.login, validateResource(authSchema), login)
authRouter.post(
  apiEndpoints.auth.register,
  validateResource(authSchema),
  register,
)
authRouter.get(apiEndpoints.auth.profile, checkIsAuthenticated, profile)

export default authRouter
