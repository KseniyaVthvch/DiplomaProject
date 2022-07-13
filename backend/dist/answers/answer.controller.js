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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const answer_dto_1 = require("./dto/answer.dto");
const pipes_1 = require("../pipes/pipes");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    getAnswerForTask(userId, taskId) {
        return this.answerService.getAnswerForTask(taskId, userId);
    }
    getAverage({ id }) {
        return this.answerService.getAverage(id);
    }
    createAnswer(body) {
        return this.answerService.createAnswer(body);
    }
    addGrade({ id }, grade) {
        return this.answerService.addGrade(id, grade);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId', pipes_1.QueryStringValidationPipe)),
    __param(1, (0, common_1.Query)('taskId', pipes_1.QueryStringValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "getAnswerForTask", null);
__decorate([
    (0, common_1.Get)('grade/average/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "getAverage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Patch)('grade/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, answer_dto_1.AddGradeDto]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "addGrade", null);
AnswerController = __decorate([
    (0, common_1.Controller)('answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map