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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const task_dto_1 = require("./dto/task.dto");
const pipes_1 = require("../pipes/pipes");
const access_decorator_1 = require("../decorators/access.decorator");
const roles_guard_1 = require("../guards/roles.guard");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(body) {
        return this.taskService.createTask(body);
    }
    update({ id }, payload) {
        return this.taskService.updateTask(id, payload);
    }
    delete({ id }) {
        return this.taskService.deleteTask(id);
    }
    getTasksAnswers(userId, courseId) {
        return this.taskService.getTasksAnswers(userId, courseId);
    }
    getTasks() {
        return this.taskService.getAllTasks();
    }
};
__decorate([
    (0, access_decorator_1.Roles)(roles_guard_1.Role.Teacher),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, access_decorator_1.Roles)(roles_guard_1.Role.Teacher),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate([
    (0, access_decorator_1.Roles)(roles_guard_1.Role.Teacher),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/answers'),
    __param(0, (0, common_1.Query)('userId', pipes_1.QueryStringValidationPipe)),
    __param(1, (0, common_1.Query)('courseId', pipes_1.QueryStringValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTasksAnswers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTasks", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map