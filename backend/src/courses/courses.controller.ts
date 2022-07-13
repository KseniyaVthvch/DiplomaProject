import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

interface PatchProps {
  studentId: string;
  courseId: string;
}

interface IdParam {
  id: string;
}

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  create(@Body() data: any) {
    return this.coursesService.createCourse(data.data, data.author);
  }

  // @Patch()
  // addStudent(@Body() data: PatchProps) {
  //   return this.coursesService.addStudent(data.courseId, data.studentId);
  // }

  // @Get()
  // async getAll() {
  //   return this.coursesService.getCourses();
  // }

  @Get(':userId')
  async getByUserId(@Param() userId: any) {
    return this.coursesService.getCoursesByUserId(userId);
  }

  @Get('/info/:courseId')
  async getCourseById(@Param() courseId: any) {
    return this.coursesService.getCourseById(courseId);
  }

  @Delete(':id')
  delete(@Param() { id }: IdParam) {
    return this.coursesService.deleteCourse(id);
  }
}
