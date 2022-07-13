import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
// import mongoose from 'mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { AddGradeDto, CreateAnswerDto } from './dto/answer.dto';
import { IAnswer } from './interfaces/answer.interface';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer.name) private answerModel: Model<IAnswer>) {}

  async addGrade(id: string, payload: AddGradeDto): Promise<IAnswer> {
    const answer = this.answerModel.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (!answer) {
      throw new NotFoundException();
    }
    return answer;
  }

  async createAnswer(payload: CreateAnswerDto): Promise<IAnswer> {
    const newAnswer = new this.answerModel(payload);
    return await newAnswer.save();
  }

  async getAnswerForTask(taskId: string, userId: string) {
    const answer = this.answerModel.findOne({
      taskId: taskId,
      userId: userId,
    });
    if (!answer) {
      throw new NotFoundException();
    }
    return answer;
  }

  async getAverage(id: string) {
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

  async getGradePointAverage(id: string) {
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
}
