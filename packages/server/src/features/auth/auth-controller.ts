import argon2 from 'argon2'
import expressAsyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { config } from '../../config.js'
import { prisma } from '../../lib/db.js'
import type { AuthPayload } from './auth-schema.js'
import { signJWTAsync } from './auth-utils.js'

const COOKIE_EXPIRES_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000
const COOKIE_EXPIRATION_DATE = new Date(
  Date.now() + COOKIE_EXPIRES_IN_MILLISECONDS,
)

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body as AuthPayload
  const user = await prisma.user.findFirst({ where: { email } })
  if (user === null) {
    return next(
      createHttpError(
        StatusCodes.UNAUTHORIZED,
        "Account deleted or user doesn't exist",
      ),
    )
  }
  const isPasswordMatch = await argon2.verify(user.password, password)
  if (!isPasswordMatch) {
    return next(
      createHttpError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'),
    )
  }
  const accessToken = await signJWTAsync(
    { id: user.id },
    config.JWT_SECRET_KEY,
    { expiresIn: config.JWT_EXPIRES_IN },
  )
  res.cookie('accessToken', accessToken, {
    expires: COOKIE_EXPIRATION_DATE,
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Successfully logged in',
  })
})
export const register = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body as AuthPayload
  const user = await prisma.user.findFirst({ where: { email } })
  if (user !== null) {
    return next(
      createHttpError(
        StatusCodes.BAD_REQUEST,
        'User with that email already exists',
      ),
    )
  }
  const hashedPassword = await argon2.hash(password)
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  })
  const accessToken = await signJWTAsync(
    { id: newUser.id },
    config.JWT_SECRET_KEY,
    { expiresIn: config.JWT_EXPIRES_IN },
  )
  res.cookie('accessToken', accessToken, {
    expires: COOKIE_EXPIRATION_DATE,
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Successfully signed up',
    data: { accessToken },
  })
})
