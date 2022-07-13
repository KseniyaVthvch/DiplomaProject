import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { QueryStringValidationPipe } from '../pipes/pipes';
import { Roles } from '../decorators/access.decorator';
import { Role } from '../guards/roles.guard';

interface IdParam {
  id: string;
}

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Roles(Role.Teacher)
  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Roles(Role.Teacher)
  @Patch(':id')
  update(@Param() { id }: IdParam, @Body() payload: UpdateTaskDto) {
    return this.taskService.updateTask(id, payload);
  }

  @Roles(Role.Teacher)
  @Delete(':id')
  delete(@Param() { id }: IdParam) {
    return this.taskService.deleteTask(id);
  }

  @Get('/answers')
  getTasksAnswers(
    @Query('userId', QueryStringValidationPipe) userId: string,
    @Query('courseId', QueryStringValidationPipe) courseId: string,
  ) {
    return this.taskService.getTasksAnswers(userId, courseId);
  }

  @Get()
  getTasks() {
    return this.taskService.getAllTasks();
  }
}
