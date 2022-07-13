import { AnswerService } from './answer.service';
import { AddGradeDto } from './dto/answer.dto';
interface IdParam {
    id: string;
}
export declare class AnswerController {
    private answerService;
    constructor(answerService: AnswerService);
    getAnswerForTask(userId: string, taskId: string): Promise<import("./interfaces/answer.interface").IAnswer & {
        _id: any;
    }>;
    getAverage({ id }: IdParam): Promise<any>;
    createAnswer(body: any): Promise<import("./interfaces/answer.interface").IAnswer>;
    addGrade({ id }: IdParam, grade: AddGradeDto): Promise<import("./interfaces/answer.interface").IAnswer>;
}
export {};
