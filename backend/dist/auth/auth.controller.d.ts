import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signUp(user: CreateUserDto, avatar: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(payload: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
