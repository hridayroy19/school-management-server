import express, { Request, Response } from 'express'
import userRouter from './app/module/user/user.router'
import authRoute from './app/module/auth/auth.route'
import classRoute from './app/module/class/class.router'
import studentRouter from './app/module/student/student.routes'
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import { NotFound } from './app/middlewares/notFound'
import techerRouter from './app/module/techer/techer.router'
import subjectRoute from './app/module/subjcet/subject.route'
import resultRouter from './app/module/result/result.route'
import sendSMSRouter from './app/module/sendSMS/sendSMS.route'

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// router
app.use('/api/user', userRouter)
app.use('/api/auth', authRoute)
app.use('/api/class', classRoute)
app.use('/api/subject', subjectRoute)
app.use('/api/student', studentRouter)
app.use('/api/teacher', techerRouter)
app.use('/api/result', resultRouter)
app.use('/api/sms', sendSMSRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

app.use(globalErrorHandler)
app.use(NotFound)

export default app
