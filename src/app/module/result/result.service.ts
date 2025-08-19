import mongoose from 'mongoose'
import { Class } from '../class/class.model'
import { Student } from '../student/student.model'
import { Subject } from '../subjcet/subject.model'
import User from '../user/user.model'
import { IResult } from './result.interface'
import { Result } from './result.model'

const calculateGrade = (marksObtained: number, maxMarks: number) => {
  const percentage = (marksObtained / maxMarks) * 100
  let grade = ''
  let gradePoint = 0

  if (percentage >= 90) {
    grade = 'A+'
    gradePoint = 4.0
  } else if (percentage >= 80) {
    grade = 'A'
    gradePoint = 3.7
  } else if (percentage >= 70) {
    grade = 'B+'
    gradePoint = 3.3
  } else if (percentage >= 60) {
    grade = 'B'
    gradePoint = 3.0
  } else if (percentage >= 50) {
    grade = 'C'
    gradePoint = 2.0
  } else if (percentage >= 40) {
    grade = 'D'
    gradePoint = 1.0
  } else {
    grade = 'F'
    gradePoint = 0.0
  }

  return { grade, gradePoint }
}

const createResultInDb = async (data: IResult) => {
  const studentExists = await Student.findById(data.studentId)
  if (!studentExists) {
    throw new Error('Student not found')
  }

  // Class
  const classExists = await Class.findById(data.classId)
  if (!classExists) {
    throw new Error('Class not found')
  }

  //Subject
  const subjectExists = await Subject.findById(data.subjectId)
  if (!subjectExists) {
    throw new Error('Subject not found')
  }

  //  creator id find out in database
  const userExists = await User.findById(data.createdBy)
  if (!userExists) {
    throw new Error('CreatedBy user not found')
  }

  const { grade, gradePoint } = calculateGrade(
    data.marksObtained,
    data.maxMarks
  )
  data.grade = grade
  data.gradePoint = gradePoint

  const result = await Result.create(data)
  return result
}

const getResultInDb = async () => {
  const results = await Result.find()
    .populate('classId', 'name')
    .populate('subjectId', 'name')
    .populate({
      path: 'studentId',
      select: 'rollNumber user',
      populate: {
        path: 'user',
        select: 'name',
      },
    })

  return results
}

const getResultsByStudentIdFromDb = async (userId: string) => {
  const student = await Student.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  })
    .select(
      'rollNumber guardianName guardianPhone contactPhone address enrollmentYear'
    )
    .populate('classId', 'name')

  if (!student) return null

  // 2️⃣ Student er result gulo fetch kora
  const results = await Result.find({ studentId: student._id })
    .populate('classId', 'name')
    .populate('subjectId', 'name')

  return {
    student,
    results,
  }
}

export const resultService = {
  createResultInDb,
  getResultInDb,
  getResultsByStudentIdFromDb,
}
