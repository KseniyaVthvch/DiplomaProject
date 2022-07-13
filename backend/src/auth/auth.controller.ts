import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/access.decorator';
import { CreateUserDto } from '../users/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }

  @Public()
  @Post('/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(@Body() user: CreateUserDto, @UploadedFile() avatar: any) {
    return this.authService.signUp(user, avatar);
  }

  @Public()
  @Post('/refresh')
  async refreshToken(@Body() payload: any) {
    return this.authService.refreshToken(payload.refresh_token);
  }
}
