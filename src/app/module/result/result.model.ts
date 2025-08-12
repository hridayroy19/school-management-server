import mongoose, { Schema } from 'mongoose';
import { IResult } from './result.interface';

const resultSchema = new Schema<IResult>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
        subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        term: {
            type: String,
            enum: ['Midterm', 'Final'],
            required: true
        },
        marksObtained: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
        grade: { type: String, required: true },
        gradePoint: { type: Number, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }
);

export const Result = mongoose.model<IResult>('Result', resultSchema);
