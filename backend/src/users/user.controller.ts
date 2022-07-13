import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../guards/roles.guard';
import { Roles } from '../decorators/access.decorator';
import { UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

interface IdParam {
  id: string;
}

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  createUser(@Body() user: any) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param() { id }: IdParam,
    @Body() payload: UpdateUserDto,
    @UploadedFile() avatar: any,
  ) {
    return this.userService.updateUser(id, payload, avatar);
  }

  @Roles(Role.Teacher)
  @Get('filter')
  async get(@Query() query: any) {
    return this.userService.getUsersByRole(query.role);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  // @ApiOperation({ summary: 'Get all users' })
  // @Roles(Role.Teacher)
  // @Get()
  // async getAllUsers() {
  //   return this.userService.findAll();
  // }
}
