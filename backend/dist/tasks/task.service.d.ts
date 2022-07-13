import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    getAllTasks(): Promise<(Task & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    createTask(createData: CreateTaskDto): Promise<Task & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    updateTask(id: string, updateData: UpdateTaskDto): Promise<Task & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    deleteTask(id: string): Promise<string>;
    getTasksAnswers(authorId: any, courseId: any): Promise<void | any[]>;
}
