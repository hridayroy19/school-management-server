/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import { Student } from './student.model'
import User from '../user/user.model'
import sendResponse from '../../utils/sendResponse'
import { studentService } from './student.service'

const creatStudent = catchAsync(async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { userId, rollNumber, classId } = req.body

    // existing student
    const existingStudent = await Student.findOne({ userId }).session(session)
    if (existingStudent) {
      throw new Error('Student with this userId already exists')
    }
    // role
    const rollExists = await Student.findOne({ rollNumber, classId }).session(
      session
    )
    if (rollExists) {
      throw new Error('Roll number already exists in this class')
    }

    // Update user role
    const user = await User.findById(userId).session(session)
    if (!user) {
      throw new Error('User not found')
    }
    await User.findByIdAndUpdate(
      userId,
      { role: 'STUDENT' },
      { session, new: true }
    )

    // Create student profile
    const result = await Student.create(req.body)
    // console.log(result)
    await session.commitTransaction()
    session.endSession()

    sendResponse(res, {
      status: true,
      statusCode: httpStatus.CREATED,
      message: 'Student profile created & role updated successfully',
      data: result,
    })
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()
    res.status(400).json({ message: error.message })
  }
})

// get all Student by admin
const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentService.studnetGetAllInDb()

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'All Student Retrieve successfully',
    data: result,
  })
})

const getSudent = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await studentService.studnetGetInDb(id)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'A Student Retrieve successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await studentService.studnetDeleteInDb(id)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'Student Delete successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  const result = await studentService.updateStudentInDb(id, updateData)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Student updated successfully',
    data: result,
  })
})

const getClassIdStudents = catchAsync(async (req, res) => {
  const { id } = req.params

  const students = await studentService.getStudentsByClassId(id)

  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Assigned students fetched successfully',
    data: students,
  })
})

export const studnetController = {
  creatStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
  getSudent,
  getClassIdStudents,
}
