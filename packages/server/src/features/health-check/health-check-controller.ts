import expressAsyncHandler from 'express-async-handler'

export const getHealthCheck = expressAsyncHandler((_req, res) => {
  const healthCheckData = {
    uptime: process.uptime(),
    status: 'OK',
    timeStamp: Date.now(),
  }
  res.send(healthCheckData)
})
