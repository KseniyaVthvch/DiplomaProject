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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
    async updateUser(id, updateData, file) {
        const newData = Object.assign({}, updateData);
        if (file) {
            const fileB64 = file.buffer.toString('base64');
            newData.avatar = {
                fileB64,
                mimetype: file.mimetype,
            };
        }
        const user = await this.userModel.findByIdAndUpdate({ _id: id }, newData, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async findAll() {
        return this.userModel.find({}, { password: 0, __v: 0 }).exec();
    }
    async getUserByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async getUserById(id) {
        return await this.userModel
            .findOne({ _id: id }, { password: 0, __v: 0 })
            .exec();
    }
    async update(image) {
        return this.userModel.updateOne({ avatar: image });
    }
    async getUsersByRole(role) {
        return this.userModel.find({ role: role }, { password: 0, avatar: 0 });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map