import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Course } from '../../courses/schemas/course.schema';
import { User } from '../../users/schema/user.schema';
export declare type TaskDocument = Task & Document;
export declare class Task {
    _id: ObjectId;
    task: string;
    description: string;
    author: User;
    courseId: Course;
}
export declare const TaskSchema: mongoose.Schema<Document<Task, any, any>, mongoose.Model<Document<Task, any, any>, any, any, any>, any>;
