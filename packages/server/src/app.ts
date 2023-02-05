import { apiEndpoints } from '@url-shortener/shared'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { NextFunction, Request, Response } from 'express'
import Express from 'express'
import helmet from 'helmet'
import type { HttpError } from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import { ZodError } from 'zod'

import { config } from './config.js'
import authRouter from './features/auth/auth-routes.js'
import healthCheckRouter from './features/health-check/health-check-routes.js'

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(cors({ origin: [config.FRONTEND_URL] }))
app.use(helmet())
app.use(cookieParser())
app.use(morgan('dev'))

// healthcheck endpoint
app.use('/healthcheck', healthCheckRouter)
// api endpoints
app.use(apiEndpoints.base, authRouter)

// global error handler
app.use(
  (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.info(error)
    const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR
    const message =
      error instanceof ZodError
        ? error.issues
        : error.message ?? 'Internal Server error'
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message,
      stack: config.NODE_ENV === 'development' ? error.stack : null,
    })
  },
)
export default app
