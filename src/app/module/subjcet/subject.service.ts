import { ISubject } from "./subjcet.interface";
import { Subject } from "./subject.model";


export const createSubjectInDb = async (data: ISubject) => {
    const result = await Subject.create(data)
    return result
}


export const getAllSubjectInDb = async () => {
    const result = await Subject.find()
    return result
}