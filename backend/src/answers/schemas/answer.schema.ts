import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Task } from '../../tasks/schemas/task.schema';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Answer {
  @Transform(({ value }) => value.toString())
  id: ObjectId;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: null })
  grade: null | number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Task.name })
  @Type(() => Task)
  taskId: Task;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
