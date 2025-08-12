import { ITeacher } from "./techer.interface"
import { Teacher } from "./techer.model"



const techerCrateInDb = async (data: ITeacher) => {
    const result = await Teacher.create(data)
    return result
}

const techerGetAllInDb = async () => {
    const result = await Teacher.find()
    return result
}

export const TecherService = {
    techerCrateInDb,
    techerGetAllInDb
}