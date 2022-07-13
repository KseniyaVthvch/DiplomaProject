import { Document, ObjectId } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import * as mongoose from 'mongoose';
export declare type CourseDocument = Course & Document;
export declare class Course {
    id: ObjectId;
    courseTitle: string;
    description: string;
    author: User;
    students: User;
}
export declare const CourseSchema: mongoose.Schema<Document<Course, any, any>, mongoose.Model<Document<Course, any, any>, any, any, any>, any>;
