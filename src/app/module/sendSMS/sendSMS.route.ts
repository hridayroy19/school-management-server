import { Router } from 'express'
import { smsController } from './sendSMController'

const sendSMSRouter = Router()

sendSMSRouter.post('/send-sms', smsController.sendSMSNotification)

export default sendSMSRouter
