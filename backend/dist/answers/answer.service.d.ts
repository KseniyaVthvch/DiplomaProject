import { Model } from 'mongoose';
import { AddGradeDto, CreateAnswerDto } from './dto/answer.dto';
import { IAnswer } from './interfaces/answer.interface';
export declare class AnswerService {
    private answerModel;
    constructor(answerModel: Model<IAnswer>);
    addGrade(id: string, payload: AddGradeDto): Promise<IAnswer>;
    createAnswer(payload: CreateAnswerDto): Promise<IAnswer>;
    getAnswerForTask(taskId: string, userId: string): Promise<IAnswer & {
        _id: any;
    }>;
    getAverage(id: string): Promise<any>;
    getGradePointAverage(id: string): Promise<any[]>;
}
