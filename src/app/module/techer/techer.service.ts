import mongoose from "mongoose"
import { ITeacher } from "./techer.interface"
import { Teacher } from "./techer.model"
import User from "../user/user.model"



const techerCrateInDb = async (data: ITeacher) => {
    const result = await Teacher.create(data)
    return result
}

const techerGetAllInDb = async () => {
    const result = await Teacher.find()
    return result
}

// student Delete 
const teacherDeleteInDb = async (teacherId: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const teacher = await Teacher.findById(teacherId).session(session);
        if (!teacher) {
            throw new Error("teacher not found");
        }

        await Teacher.findByIdAndDelete(teacherId).session(session);

        if (teacher.userId) {
            const user = await User.findOne({ _id: teacher.userId, role: "TEACHER" }).session(session);
            if (user) {
                await User.findByIdAndDelete(teacher.userId).session(session);
            }
        }

        await session.commitTransaction();
        session.endSession();

        return { teacherId, userId: teacher.userId };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const TecherService = {
    techerCrateInDb,
    techerGetAllInDb,
    teacherDeleteInDb
}