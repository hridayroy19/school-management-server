import express, { Request, Response } from 'express'
import userRouter from './app/module/user/user.router'
import authRoute from './app/module/auth/auth.route'

const app = express()

// middleware
app.use(express.json())



// router 
app.use('/api/user', userRouter)
app.use('/api/auth', authRoute)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

export default app
