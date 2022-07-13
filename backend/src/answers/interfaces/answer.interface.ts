import { Document } from 'mongoose';

export interface IAnswer extends Document {
  answer: string;
  grade: null | number;
  userId: string;
  taskId: string;
}
