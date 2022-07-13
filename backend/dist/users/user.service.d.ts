import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(user: any): Promise<User>;
    updateUser(id: string, updateData: any, file: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    update(image: any): Promise<any>;
    getUsersByRole(role: any): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
