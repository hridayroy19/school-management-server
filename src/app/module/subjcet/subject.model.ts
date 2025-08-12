import mongoose, { Schema } from 'mongoose';
import { ISubject } from './subjcet.interface';

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    fullMarks: { type: Number, required: true },
    passMarks: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export const Subject = mongoose.model<ISubject>('Subject', subjectSchema);
