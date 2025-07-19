import  httpStatus  from 'http-status';
// req and res manage

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

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await userService.updateUserProfile(userId, req.body);
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});



export const userController = {
  getUser,
  updateMyProfile
}
