export interface IUser {
  name: string
  email: string
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}
