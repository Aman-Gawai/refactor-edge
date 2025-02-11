
import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
}

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);
