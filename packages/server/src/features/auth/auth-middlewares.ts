import expressAsyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { config } from '../../config.js'
import { verifyJWTAsync } from './auth-utils.js'

export const checkIsAuthenticated = expressAsyncHandler(
  async (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization === undefined) {
      return next(
        createHttpError(StatusCodes, 'Unauthorized.Please login first'),
      )
    }
    const [_, token] = authorization.split('_')
    const user = await verifyJWTAsync<{ id: string }>(
      token,
      config.JWT_SECRET_KEY,
    )
  },
)
