import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Course } from '../../courses/schemas/course.schema';
import { User } from '../../users/schema/user.schema';

export type TaskDocument = Task & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Task {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Course.name })
  @Type(() => Course)
  courseId: Course;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
