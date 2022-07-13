import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAllTasks() {
    return this.taskModel.find();
  }

  async createTask(createData: CreateTaskDto) {
    const newTask = new this.taskModel(createData);
    return await newTask.save();
  }

  async updateTask(id: string, updateData: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true },
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async deleteTask(id: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      throw new NotFoundException();
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
}
