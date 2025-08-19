/* eslint-disable @typescript-eslint/no-explicit-any */
// sms.service.ts
import twilio from 'twilio'
import { Student } from '../student/student.model'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const senderPhone = process.env.TWILIO_PHONE_NUMBER
// console.log(accountSid,authToken,senderPhone)
let client: any = null
if (accountSid && authToken) {
  client = twilio(accountSid, authToken)
}

const sendSMS = async (phone: string, message: string) => {
  if (client) {
    await client.messages.create({
      body: message,
      from: senderPhone,
      to: phone,
    })
  } else {
    // console.log(`SMS to ${phone}: ${message}`);
  }
}

const sendNotification = async (
  studentIds: string[],
  message: string,
  target: 'student' | 'guardian'
) => {
  const students = await Student.find({ _id: { $in: studentIds } })
  // console.log(students,"data")

  for (const student of students) {
    const phone =
      target === 'student' ? student.contactPhone : student.guardianPhone
    if (phone) {
      await sendSMS(phone, message)
    }
  }
  return { success: true, count: students.length }
}

export const smsService = {
  sendNotification,
}
