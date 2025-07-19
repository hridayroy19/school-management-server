/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"
import httpStatus from 'http-status'

export const handlerDuplicateError = (err: any, res: Response) => {
    res.status(httpStatus.CONFLICT).json({
        status: false,
        message: err.message,
        error: err
    })
} 