import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Role } from '../../guards/roles.guard';

export type UserDocument = User & Document;

interface IAvatar {
  fileB64: string;
  mimetype: string;
}

@Exclude()
@Schema({
  versionKey: false,
  // toJSON: {
  //   getters: true,
  //   transform: function (doc, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //   },
  // },
})
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop({ type: { fileB64: String, mimetype: String } })
  avatar: IAvatar;

  @Prop({
    default() {
      return Role.Student;
    },
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
