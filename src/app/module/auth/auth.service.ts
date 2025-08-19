import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'

const regiserIntoDb = async (payload: IUser) => {
  const result = await User.create(payload)
  // console.log(result, 'data')
  return result
}

const loginIntoDb = async (payload: { email: string; password: string }) => {
  // console.log(payload);
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new Error('user is not found')
  }

  const userSatatus = user?.userStatus

  if (userSatatus === 'inactive') {
    throw new Error('user is Inactive')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new Error('Wrong password !! Try again')
  }

  //create token and sent to the  client
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    id: user.id,
    profile: user.profilePhotoUrl,
  }

  const token = jwt.sign(jwtPayload, 'secrect', { expiresIn: '4d' })
  const veryfiUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    id: user?.id,
    profile: user?.profilePhotoUrl,
  }

  return { token, veryfiUser }
}

export const AuthServer = {
  regiserIntoDb,
  loginIntoDb,
}
