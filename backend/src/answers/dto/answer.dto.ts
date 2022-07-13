import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class AddGradeDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;
}

export class CreateAnswerDto {
  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  taskId: string;
}

export class GetAnswerForTaskDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  taskId: string;
}
