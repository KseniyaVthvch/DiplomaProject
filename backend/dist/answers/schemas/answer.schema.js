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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerSchema = exports.Answer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/schema/user.schema");
const task_schema_1 = require("../../tasks/schemas/task.schema");
const class_transformer_1 = require("class-transformer");
const mongoose = require("mongoose");
let Answer = class Answer {
};
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.toString()),
    __metadata("design:type", Object)
], Answer.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Answer.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Answer.prototype, "grade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    (0, class_transformer_1.Type)(() => user_schema_1.User),
    __metadata("design:type", user_schema_1.User)
], Answer.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: task_schema_1.Task.name }),
    (0, class_transformer_1.Type)(() => task_schema_1.Task),
    __metadata("design:type", task_schema_1.Task)
], Answer.prototype, "taskId", void 0);
Answer = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        versionKey: false,
    })
], Answer);
exports.Answer = Answer;
exports.AnswerSchema = mongoose_1.SchemaFactory.createForClass(Answer);
//# sourceMappingURL=answer.schema.js.map