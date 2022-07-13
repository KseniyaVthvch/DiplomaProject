import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AddGradeDto } from './dto/answer.dto';
import { QueryStringValidationPipe } from '../pipes/pipes';

interface IdParam {
  id: string;
}

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Get()
  getAnswerForTask(
    @Query('userId', QueryStringValidationPipe) userId: string,
    @Query('taskId', QueryStringValidationPipe) taskId: string,
  ) {
    return this.answerService.getAnswerForTask(taskId, userId);
  }

  @Get('grade/average/:id')
  getAverage(@Param() { id }: IdParam) {
    return this.answerService.getAverage(id);
  }

  @Post()
  createAnswer(@Body() body: any) {
    return this.answerService.createAnswer(body);
  }

  @Patch('grade/:id')
  addGrade(@Param() { id }: IdParam, @Body() grade: AddGradeDto) {
    return this.answerService.addGrade(id, grade);
  }
}
