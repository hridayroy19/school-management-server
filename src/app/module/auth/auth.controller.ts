import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServer } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthServer.regiserIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Register is successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthServer.loginIntoDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.ACCEPTED,
    token: result.token,
    message: 'Login is successfully',
    data: result.veryfiUser,
  })
})

export const AuthController = {
  register,
  login,
}
