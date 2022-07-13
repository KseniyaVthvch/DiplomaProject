import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  task: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  courseId: string;
}
