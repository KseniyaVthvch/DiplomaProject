import { Document, ObjectId } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Task } from '../../tasks/schemas/task.schema';
import * as mongoose from 'mongoose';
export declare type AnswerDocument = Answer & Document;
export declare class Answer {
    id: ObjectId;
    answer: string;
    grade: null | number;
    userId: User;
    taskId: Task;
}
export declare const AnswerSchema: mongoose.Schema<Document<Answer, any, any>, mongoose.Model<Document<Answer, any, any>, any, any, any>, any>;
