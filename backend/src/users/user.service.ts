import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: any): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser(id: string, updateData: any, file: any) {
    const newData = { ...updateData };
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
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0, __v: 0 }).exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel
      .findOne({ _id: id }, { password: 0, __v: 0 })
      .exec();
  }

  async update(image: any): Promise<any> {
    return this.userModel.updateOne({ avatar: image });
  }

  async getUsersByRole(role) {
    return this.userModel.find({ role: role }, { password: 0, avatar: 0 });
  }
}
