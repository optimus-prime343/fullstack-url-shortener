import type { User } from '@prisma/client'
import crypto from 'crypto'
import expressAsyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import openGraphScraper from 'open-graph-scraper'

import { prisma } from '../../lib/db.js'
import type {
  CreateShortURLPayload,
  DeleteShortenedURLPayload,
  GetShortenedURLsQuery,
} from './shorten-url-schema.js'

export const createShortURL = expressAsyncHandler(async (req, res, _next) => {
  const user = res.locals.user as User
  const { originalURL } = req.body as CreateShortURLPayload
  const shortenedUrl = await prisma.url.findFirst({
    where: { originalUrl: originalURL, userId: user.id },
    include: { openGraphMetaData: true },
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
  const openGraphResponse = await openGraphScraper({ url: originalURL })
  if (openGraphResponse.result) {
    const { ogTitle, ogUrl, ogImage, ogDescription } = openGraphResponse.result
    await prisma.openGraphMetaData.create({
      data: {
        ogTitle: ogTitle ?? null,
        ogUrl: ogUrl ?? null,
        ogDescription: ogDescription ?? null,
        ogImage:
          typeof ogImage === 'string'
            ? ogImage
            : Array.isArray(ogImage)
            ? ogImage[0].url
            : ogImage?.url ?? null,
        urlId: newShortenedURL.id,
      },
    })
  }
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
    const { page, perPage } = req.query as unknown as GetShortenedURLsQuery

    const total = await prisma.url.count({ where: { userId: user.id } })
    const skip = (page - 1) * perPage
    const nextPage = page * perPage < total ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null

    const shortenedURLs = await prisma.url.findMany({
      take: perPage,
      skip,
      where: { userId: user.id },
      include: { openGraphMetaData: true },
      orderBy: { createdAt: 'desc' },
    })
    res.status(StatusCodes.OK).send({
      success: true,
      data: { shortenedURLs, nextPage, prevPage, total },
    })
  },
)
export const deleteShortendURL = expressAsyncHandler(
  async (req, res, _next) => {
    const user = res.locals.user as User
    const { id } = req.params as DeleteShortenedURLPayload
    const url = await prisma.url.findFirst({ where: { id, userId: user.id } })
    if (url === null) {
      res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "URL doesn't exist or has been deleted",
      })
      return
    }
    await prisma.openGraphMetaData.delete({ where: { urlId: url.id } })
    await prisma.url.delete({ where: { id: url.id } })
    res.status(StatusCodes.CREATED).send({
      success: true,
      message: 'Successfully deleted shortened URL',
    })
  },
)
