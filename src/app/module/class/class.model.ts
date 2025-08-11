import mongoose, { Schema } from "mongoose";
import { IClass } from "./class.interface";


const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  section: { type: String },
  session: { type: String, required: true },
}, { timestamps: true });

export const Class = mongoose.model<IClass>('Class', classSchema);