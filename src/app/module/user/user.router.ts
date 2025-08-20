import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'

const userRouter = Router()

userRouter.get('/', auth("ADMIN"),userController.getUser)
userRouter.delete('/:id',auth("ADMIN"),userController.deleteUser)

export default userRouter
