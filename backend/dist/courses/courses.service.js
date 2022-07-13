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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("./schemas/course.schema");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
let CoursesService = class CoursesService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async createCourse(section, author) {
        const newCourse = new this.courseModel(Object.assign(Object.assign({}, section), { author }));
        return await newCourse.save();
    }
    async addStudent(courseId, studentId) {
        return this.courseModel.updateOne({ id: courseId }, { $addToSet: { students: studentId } });
    }
    async getCoursesByUserId({ userId }) {
        return this.courseModel.find({
            $or: [
                {
                    author: userId,
                },
                {
                    students: userId,
                },
            ],
        }, {
            _id: 1,
            courseTitle: 1,
            description: 1,
            author: 1,
            students: 1,
        });
    }
    async getCourses() {
        return this.courseModel.find();
    }
    async getCourseById({ courseId }) {
        return this.courseModel
            .aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'courseId',
                    as: 'tasks',
                },
            },
        ])
            .then((res) => res[0])
            .catch((e) => console.log(e));
    }
    async deleteCourse(id) {
        const deletedTask = await this.courseModel.findByIdAndDelete({ _id: id });
        if (!deletedTask) {
            throw new common_1.NotFoundException();
        }
        return { message: 'Successfully deleted' };
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map