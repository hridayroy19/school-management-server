import mongoose, { Schema } from "mongoose";
import { IStudent } from "./student.interface";

const studentSchema = new Schema<IStudent>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    rollNumber: { type: String, required: true, unique: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    enrollmentYear: { type: Date, required: true },
}, { timestamps: true });


export const Student = mongoose.model<IStudent>('Student', studentSchema);