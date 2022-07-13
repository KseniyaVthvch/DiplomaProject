import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(userDto: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signUp(user: CreateUserDto, file: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateToken;
    refreshToken(refresh_token: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
