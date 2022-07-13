import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
interface IdParam {
    id: string;
}
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(body: CreateTaskDto): Promise<import("./schemas/task.schema").Task & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update({ id }: IdParam, payload: UpdateTaskDto): Promise<import("./schemas/task.schema").Task & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete({ id }: IdParam): Promise<string>;
    getTasksAnswers(userId: string, courseId: string): Promise<void | any[]>;
    getTasks(): Promise<(import("./schemas/task.schema").Task & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
export {};
