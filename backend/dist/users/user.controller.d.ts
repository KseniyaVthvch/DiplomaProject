/// <reference types="mongoose" />
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
interface IdParam {
    id: string;
}
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(user: any): Promise<import("./schema/user.schema").User>;
    update({ id }: IdParam, payload: UpdateUserDto, avatar: any): Promise<import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    get(query: any): Promise<(import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getUserById(id: string): Promise<import("./schema/user.schema").User>;
}
export {};
