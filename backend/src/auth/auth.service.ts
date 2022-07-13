import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: any) {
    const user = await this.userService.getUserByEmail(userDto.email);
    let isPasswordCorrect = false;

    if (user) {
      isPasswordCorrect = await bcrypt.compare(
        userDto.password,
        user?.password,
      );
    }

    if (isPasswordCorrect) {
      return await this.generateToken(user);
    }

    throw new UnauthorizedException({
      message: "The email or password you entered isn't correct.",
    });
  }

  async signUp(user: CreateUserDto, file) {
    const candidate = await this.userService.getUserByEmail(user.email);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(user.password, 5);
    const fileB64 = file.buffer.toString('base64');
    const avatar = {
      fileB64,
      mimetype: file.mimetype,
    };

    const newUser = await this.userService.createUser({
      ...user,
      avatar,
      password: hashPassword,
    });
    return await this.generateToken(newUser);
  }

  private async generateToken(user) {
    const payload = { email: user.email, id: user.id, role: user.role };

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: 'refresh',
    });

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '10h',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refresh_token) {
    try {
      const payload = await this.jwtService.decode(refresh_token);
      if (payload) {
        const user = await this.userService.getUserByEmail(payload['email']);
        return this.generateToken(user);
      }
    } catch (e) {
      throw new HttpException(
        'Cannot get refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
