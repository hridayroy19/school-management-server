import mongoose from 'mongoose'

export interface IStudent {
  userId: mongoose.Types.ObjectId
  rollNumber: string
  classId: mongoose.Types.ObjectId
  guardianName: string
  guardianPhone: string
  contactPhone: string
  address: string
  enrollmentYear: Date
  user: mongoose.Types.ObjectId
}
