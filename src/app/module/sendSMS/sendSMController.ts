// sms.controller.ts
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { smsService } from './sendSMSService'

const sendSMSNotification = catchAsync(async (req: Request, res: Response) => {
  const { studentIds, message, target } = req.body

  const result = await smsService.sendNotification(studentIds, message, target)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'SMS sent successfully',
    data: result,
  })
})

export const smsController = {
  sendSMSNotification,
}
