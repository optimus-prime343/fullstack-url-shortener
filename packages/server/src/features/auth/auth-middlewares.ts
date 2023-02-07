import expressAsyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { config } from '../../config.js'
import { prisma } from '../../lib/db.js'
import { verifyJWTAsync } from './auth-utils.js'

export const checkIsAuthenticated = expressAsyncHandler(
  async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken && req.originalUrl === '/api/v1/auth/profile') {
      return next()
    }
    if (!accessToken) {
      return next(
        createHttpError(StatusCodes, 'Unauthorized.Please login first'),
      )
    }
    const { id } = await verifyJWTAsync<{ id: string }>(
      accessToken,
      config.JWT_SECRET_KEY,
    )
    const user = await prisma.user.findFirst({
      where: { id },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    })
    if (user === null) {
      return next(createHttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized'))
    }
    res.locals.user = user
    next()
  },
)
