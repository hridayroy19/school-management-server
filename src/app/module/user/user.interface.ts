export type UserRole = 'USER' | 'STUDENT' | 'TEACHER' | 'ADMIN'

export interface IUser {
  name: string
  email: string
  password: string
  role: UserRole
  userStatus: string
  profilePhotoUrl: string
  createdAt: Date
  updatedAt: Date
}
