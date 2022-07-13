import { CoursesService } from './courses.service';
interface IdParam {
    id: string;
}
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    create(data: any): Promise<any>;
    getByUserId(userId: any): Promise<any>;
    getCourseById(courseId: any): Promise<any>;
    delete({ id }: IdParam): Promise<{
        message: string;
    }>;
}
export {};
