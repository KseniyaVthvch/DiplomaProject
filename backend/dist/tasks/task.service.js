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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./schemas/task.schema");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async getAllTasks() {
        return this.taskModel.find();
    }
    async createTask(createData) {
        const newTask = new this.taskModel(createData);
        return await newTask.save();
    }
    async updateTask(id, updateData) {
        const task = await this.taskModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });
        if (!task) {
            throw new common_1.NotFoundException();
        }
        return task;
    }
    async deleteTask(id) {
        const deletedTask = await this.taskModel.findByIdAndDelete({ _id: id });
        if (!deletedTask) {
            throw new common_1.NotFoundException();
        }
        return 'Successfully deleted';
    }
    async getTasksAnswers(authorId, courseId) {
        return await this.taskModel
            .aggregate([
            { $match: { author: new mongoose.Types.ObjectId(authorId) } },
            {
                $lookup: {
                    from: 'answers',
                    localField: '_id',
                    foreignField: 'taskId',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'userId',
                                foreignField: '_id',
                                pipeline: [
                                    {
                                        $project: {
                                            name: 1,
                                            avatar: 1,
                                        },
                                    },
                                ],
                                as: 'user',
                            },
                        },
                        { $unwind: '$user' },
                    ],
                    as: 'answers',
                },
            },
            { $match: { answers: { $not: { $size: 0 } } } },
            { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
        ])
            .then((res) => res)
            .catch((e) => console.log(e));
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map