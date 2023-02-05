import { Router } from 'express'

import { getHealthCheck } from './health-check-controller.js'

const healthCheckRouter = Router()

healthCheckRouter.get('/', getHealthCheck)

export default healthCheckRouter
