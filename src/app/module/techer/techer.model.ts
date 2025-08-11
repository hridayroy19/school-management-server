import mongoose, { Schema } from "mongoose";
import { ITeacher } from "./techer.interface";


const teacherSchema = new Schema<ITeacher>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        subjects: {
            type: [String],
            required: true,
        },
        assignedClasses: {
            type: [Schema.Types.ObjectId],
            ref: "Class",
            default: [],
        },
        contactPhone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        joinDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);
