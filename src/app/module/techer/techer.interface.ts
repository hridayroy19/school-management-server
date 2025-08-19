import mongoose from 'mongoose'

export interface ITeacher {
  userId: mongoose.Types.ObjectId
  employeeId: string
  subjects: string[]
  assignedClasses: []
  contactPhone: string
  address: string
  joinDate: Date
}
