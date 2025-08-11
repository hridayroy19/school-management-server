import { IStudent } from "./student.interface"
import { Student } from "./student.model"


const studnetcrateInDb = async (data: IStudent) => {
    const result = await Student.create(data)
    return result


}

export const studentService = {
    studnetcrateInDb,
}