import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { userService } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser()

    res.send({
      status: true,
      message: 'Users getting successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await userService.deletetUserIntoDB(id)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'User Delete successfully',
    data: result,
  })
})

export const userController = {
  getUser,
  deleteUser,
}
