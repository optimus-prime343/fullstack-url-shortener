import type { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import type { AnyZodObject } from 'zod'
import { ZodError } from 'zod'

export const validateResource =
  (schema: AnyZodObject): RequestHandler =>
  async (req: Request, _response: Response, next: NextFunction) => {
    try {
      const data = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      req.body = data.body
      req.params = data.params
      req.query = data.params
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(createHttpError(StatusCodes.BAD_REQUEST, error))
      }
    }
  }
