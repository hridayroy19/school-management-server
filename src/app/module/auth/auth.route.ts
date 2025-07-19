import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/userValidation'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'


const authRoute = Router()

authRoute.post(
    '/register',
    validateRequest(UserValidation.userValidationSchema),
    AuthController.register
)
authRoute.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.login
)

export default authRoute