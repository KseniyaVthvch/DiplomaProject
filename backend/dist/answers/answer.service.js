"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("./schemas/answer.schema");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
let AnswerService = class AnswerService {
    constructor(answerModel) {
        this.answerModel = answerModel;
    }
    async addGrade(id, payload) {
        const answer = this.answerModel.findByIdAndUpdate({ _id: id }, payload, {
            new: true,
        });
        if (!answer) {
            throw new common_1.NotFoundException();
        }
        return answer;
    }
    async createAnswer(payload) {
        const newAnswer = new this.answerModel(payload);
        return await newAnswer.save();
    }
    async getAnswerForTask(taskId, userId) {
        const answer = this.answerModel.findOne({
            taskId: taskId,
            userId: userId,
        });
        if (!answer) {
            throw new common_1.NotFoundException();
        }
        return answer;
    }
    async getAverage(id) {
        return this.answerModel
            .aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(id),
                    grade: {
                        $ne: null,
                    },
                },
            },
            {
                $group: {
                    _id: '$userId',
                    average: { $avg: '$grade' },
                },
            },
        ])
            .then((data) => data[0]);
    }
    async getGradePointAverage(id) {
        return this.answerModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: 'id',
                    foreignField: 'taskId',
                    as: 'task',
                    let: { task_id: '$taskId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$task_id'] },
                            },
                        },
                    ],
                },
            },
            {
                $set: {
                    task: { $arrayElemAt: ['$task.task', 0] },
                },
            },
            {
                $match: {
                    grade: {
                        $ne: null,
                    },
                },
            },
            {
                $project: {
                    taskId: 0,
                    answer: 0,
                    userId: 0,
                },
            },
        ]);
    }
};
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map