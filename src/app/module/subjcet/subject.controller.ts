import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { createSubjectInDb, getAllSubjectInDb } from './subject.service'

export const createSubject = catchAsync(async (req, res) => {
  const result = await createSubjectInDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Subject Create successfully',
    data: result,
  })
})

export const getAllSubject = catchAsync(async (req, res) => {
  const result = await getAllSubjectInDb()

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Subject Retrieve successfully',
    data: result,
  })
})
