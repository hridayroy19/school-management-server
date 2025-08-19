import User from './user.model'

const getUser = async () => {
  const result = await User.find({ role: 'USER' })
  return result
}
const deletetUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const userService = {
  getUser,
  deletetUserIntoDB,
}
