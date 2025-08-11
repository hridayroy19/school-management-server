import User from './user.model'

const getUser = async () => {
  const result = await User.find()
  return result
}


export const userService = {
  getUser,
}
