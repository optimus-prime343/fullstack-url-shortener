import type { User } from '@prisma/client'
import crypto from 'crypto'
import expressAsyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../../lib/db.js'
import type { CreateShortURLPayload } from './shorten-url-schema.js'

export const createShortURL = expressAsyncHandler(async (req, res, _next) => {
  const user = res.locals.user as User
  const { originalURL } = req.body as CreateShortURLPayload
  const shortenedUrl = await prisma.url.findFirst({
    where: { originalUrl: originalURL, userId: user.id },
  })
  if (shortenedUrl !== null) {
    res.status(StatusCodes.OK).send({ success: true, data: { shortenedUrl } })
    return
  }
  const shortenedURLId = crypto.randomUUID()
  const shortenedURL = `${req.protocol}://${req.get('host')}/${shortenedURLId}`
  const newShortenedURL = await prisma.url.create({
    data: {
      id: shortenedURLId,
      originalUrl: originalURL,
      shortenedUrl: shortenedURL,
      userId: user.id,
    },
  })
  res.status(StatusCodes.OK).send({
    success: true,
    message: 'Successfully shotened URL',
    data: { shortenedURL: newShortenedURL },
  })
})
export const openShortenedURL = expressAsyncHandler(async (req, res, _next) => {
  const { urlID } = req.params
  const shortenedURL = await prisma.url.findFirst({ where: { id: urlID } })
  if (shortenedURL === null) return
  const updatedShortenedURL = await prisma.url.update({
    where: { id: urlID },
    data: {
      totalViews: { increment: 1 },
    },
  })
  res.redirect(updatedShortenedURL.originalUrl)
})
export const getAllShortenedURLs = expressAsyncHandler(
  async (req, res, _next) => {
    const user = res.locals.user as User
    const shortenedURLs = await prisma.url.findMany({
      where: { userId: user.id },
    })
    res.status(StatusCodes.OK).send({ success: true, data: { shortenedURLs } })
  },
)