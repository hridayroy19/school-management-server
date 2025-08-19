// result.controller.ts
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { resultService } from './result.service'

const createResult = catchAsync(async (req, res) => {
  const result = await resultService.createResultInDb(req.body)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Result created successfully',
    data: result,
  })
})

const getResult = catchAsync(async (req, res) => {
  const result = await resultService.getResultInDb()

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Result Retrieve successfully',
    data: result,
  })
})

const getResultById = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await resultService.getResultsByStudentIdFromDb(id)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Result Retrieve successfully',
    data: result,
  })
})

export const resultController = {
  createResult,
  getResult,
  getResultById,
}
