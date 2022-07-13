import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(section: any, author): Promise<any> {
    const newCourse = new this.courseModel({
      ...section,
      author,
    });
    return await newCourse.save();
  }

  async addStudent(courseId, studentId: string): Promise<any> {
    return this.courseModel.updateOne(
      { id: courseId },
      //Adds elements to an array only if they do not already exist in the set.
      { $addToSet: { students: studentId } },
    );
  }

  async getCoursesByUserId({ userId }): Promise<any> {
    return this.courseModel.find(
      {
        $or: [
          {
            author: userId,
          },
          {
            students: userId,
          },
        ],
      },
      {
        _id: 1,
        courseTitle: 1,
        description: 1,
        author: 1,
        students: 1,
      },
    );
  }

  async getCourses(): Promise<any> {
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

  async deleteCourse(id: string) {
    const deletedTask = await this.courseModel.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      throw new NotFoundException();
    }
    return { message: 'Successfully deleted' };
  }
}
