/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: 'API Not Found !!',
    error: '',
  })
}
