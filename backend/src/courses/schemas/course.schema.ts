import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  // toJSON: {
  //   getters: true,
  //   transform: function (doc, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //   },
  // },
})
export class Course {
  @Transform(({ value }) => value.toString())
  id: ObjectId;

  @Prop({ required: true })
  courseTitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  @Type(() => User)
  students: User;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
