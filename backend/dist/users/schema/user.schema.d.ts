import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
interface IAvatar {
    fileB64: string;
    mimetype: string;
}
export declare class User {
    email: string;
    password: string;
    name: string;
    avatar: IAvatar;
    role: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any>;
export {};
