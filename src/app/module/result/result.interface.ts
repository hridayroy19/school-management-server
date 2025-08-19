import mongoose from 'mongoose'

export interface IResult {
  studentId: mongoose.Types.ObjectId
  classId: mongoose.Types.ObjectId
  subjectId: mongoose.Types.ObjectId
  term: 'Midterm' | 'Final'
  marksObtained: number
  maxMarks: number
  grade: string
  gradePoint: number
  createdBy: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
}
