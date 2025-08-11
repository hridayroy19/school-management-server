import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { classService } from './class.service'

const CreateClass = catchAsync(async (req, res) => {
    const { name, section, session } = req.body

    if (!name || !session) {
        res.status(400).json({ message: 'Class name and session are required' })
    }

    const existingClass = await classService.findClass({ name, section, session })
    if (existingClass) {
        res.status(400).json({ message: 'Class already exists for this session' })
    }

    // Create class in DB
    const result = await classService.classCrateDb(req.body)

    sendResponse(res, {
        status: true,
        statusCode: httpStatus.CREATED,
        message: 'Class created successfully',
        data: result,
    })
})

const getAllClass = catchAsync(async (req, res) => {

    const result = await classService.classGetAllDb()

    sendResponse(res, {
        status: true,
        statusCode: httpStatus.CREATED,
        message: 'Class Retrive successfully',
        data: result,
    })
})

export const classController = {
    CreateClass,
    getAllClass
}
