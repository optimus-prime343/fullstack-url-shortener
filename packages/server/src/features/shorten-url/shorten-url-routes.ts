import { apiEndpoints } from '@url-shortener/shared'
import { Router } from 'express'

import { validateResource } from '../../shared/middlewares/validate-resource.js'
import { checkIsAuthenticated } from '../auth/auth-middlewares.js'
import {
  createShortURL,
  getAllShortenedURLs,
} from './shorten-url-controller.js'
import { createShortUrlSchema } from './shorten-url-schema.js'

const shortenUrlRouter = Router()

shortenUrlRouter.use(checkIsAuthenticated)

shortenUrlRouter.get(apiEndpoints.shortenUrl.base, getAllShortenedURLs)
shortenUrlRouter.post(
  apiEndpoints.shortenUrl.base,
  validateResource(createShortUrlSchema),
  createShortURL,
)

export default shortenUrlRouter
