/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IStudent } from './student.interface'
import { Student } from './student.model'
import User from '../user/user.model'

const studnetcrateInDb = async (data: IStudent) => {
  const result = await Student.create(data)
  return result
}
const studnetGetAllInDb = async () => {
  const result = await Student.find().populate('userId', 'name')
  return result
}

// get single student
const studnetGetInDb = async (id: string) => {
  const result = await Student.findById(id)
  return result
}

// student Delete
const studnetDeleteInDb = async (studentId: string) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const student = await Student.findById(studentId).session(session)
    if (!student) {
      throw new Error('Student not found')
    }

    await Student.findByIdAndDelete(studentId).session(session)

    if (student.userId) {
      const user = await User.findOne({
        _id: student.userId,
        role: 'STUDENT',
      }).session(session)
      if (user) {
        await User.findByIdAndDelete(student.userId).session(session)
      }
    }

    await session.commitTransaction()
    session.endSession()

    return { studentId, userId: student.userId }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// update studnet all data , can not update email namd password
const updateStudentInDb = async (id: string, payload: Partial<any>) => {
  const student = await Student.findById(id)
  if (!student) {
    throw new Error('Student not found')
  }

  if (payload.name) {
    await User.findByIdAndUpdate(
      student.userId,
      { name: payload.name },
      { new: true }
    )
  }

  const profileFields = [
    'address',
    'guardianName',
    'guardianPhone',
    'contactPhone',
    'rollNumber',
    'classId',
    'enrollmentYear',
  ]
  profileFields.forEach((field) => {
    if (payload[field] !== undefined) {
      ;(student as any)[field] = payload[field]
    }
  })

  await student.save()
  return student
}

const getStudentsByClassId = async (classId: string) => {
   
  const students = await Student.find({classId} )
 

  if (!students || students.length === 0)
    throw new Error('No students found for this class')

  return students
}

export const studentService = {
  studnetcrateInDb,
  studnetGetAllInDb,
  studnetDeleteInDb,
  updateStudentInDb,
  studnetGetInDb,
  getStudentsByClassId,
}
