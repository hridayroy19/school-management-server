import mongoose from "mongoose"
import User from "../user/user.model"
import { IStudent } from "./student.interface"
import { Student } from "./student.model"


const studnetcrateInDb = async (data: IStudent) => {
    const result = await Student.create(data)
    return result
}
const studnetGetAllInDb = async () => {
    const result = await Student.find()
    return result
}

// student Delete 
const studnetDeleteInDb = async (studentId: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const student = await Student.findById(studentId).session(session);
        if (!student) {
            throw new Error("Student not found");
        }

        await Student.findByIdAndDelete(studentId).session(session);

        if (student.userId) {
            const user = await User.findOne({ _id: student.userId, role: "STUDENT" }).session(session);
            if (user) {
                await User.findByIdAndDelete(student.userId).session(session);
            }
        }

        await session.commitTransaction();
        session.endSession();

        return { studentId, userId: student.userId };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const studentService = {
    studnetcrateInDb,
    studnetGetAllInDb,
    studnetDeleteInDb
}