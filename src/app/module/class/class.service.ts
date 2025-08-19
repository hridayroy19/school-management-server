import { IClass } from './class.interface'
import { Class } from './class.model'

const findClass = async (filter: Partial<IClass>) => {
  return await Class.findOne(filter)
}

const classCrateDb = async (payload: IClass) => {
  const result = await Class.create(payload)
  return result
}
const classGetAllDb = async () => {
  const result = await Class.find()
  return result
}

const classGetIdDb = async (classId: string) => {
  const result = await Class.findById(classId)
  return result
}

export const classService = {
  classCrateDb,
  findClass,
  classGetAllDb,
  classGetIdDb,
}
