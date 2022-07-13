import { CourseDocument } from './schemas/course.schema';
import { Model } from 'mongoose';
export declare class CoursesService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    createCourse(section: any, author: any): Promise<any>;
    addStudent(courseId: any, studentId: string): Promise<any>;
    getCoursesByUserId({ userId }: {
        userId: any;
    }): Promise<any>;
    getCourses(): Promise<any>;
    getCourseById({ courseId }: {
        courseId: any;
    }): Promise<any>;
    deleteCourse(id: string): Promise<{
        message: string;
    }>;
}
