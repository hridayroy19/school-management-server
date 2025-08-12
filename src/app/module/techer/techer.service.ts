/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { ITeacher } from "./techer.interface"
import { Teacher } from "./techer.model"
import User from "../user/user.model"
import { Student } from "../student/student.model"



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

const updateTeacherInDb = async (id: string, payload: Partial<any>) => {
    // console.log(id,'id')

    const teacher = await Teacher.findById(id);
    // console.log(teacher,'data')

    if (!teacher) {
        throw new Error('teacher not found');
    }


    if (payload.name) {
        await User.findByIdAndUpdate(teacher.userId, { name: payload.name }, { new: true });
    }

    const profileFields = [
        'employeeId',
        'contactPhone',
        'address',
        'joiningDate',
        'subjects',
        'assignedClasses'
    ];

    profileFields.forEach(field => {
        if (payload[field] !== undefined) {
            (teacher as any)[field] = payload[field];
        }
    });

    await teacher.save();
    return teacher;
};


const getAssignedStudents = async (teacherId: string) => {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) throw new Error("Teacher not found");
    const students = await Student.find({
        classId: { $in: teacher.assignedClasses }
    });

    return students;
}



export const TecherService = {
    techerCrateInDb,
    techerGetAllInDb,
    teacherDeleteInDb,
    updateTeacherInDb,
    getAssignedStudents
}