import { Router } from 'express'
import { userController } from './user.controller'

const userRouter = Router()

userRouter.get('/', userController.getUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter
