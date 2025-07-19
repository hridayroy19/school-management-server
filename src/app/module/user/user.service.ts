import User from './user.model'

const getUser = async () => {
  const result = await User.find()
  return result
}


const updateUserProfile = async (userId: string, payload: Partial<{ name: string; profilePhoto: string; }>) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return updatedUser;
};

export const userService = {
  getUser,
  updateUserProfile
}
