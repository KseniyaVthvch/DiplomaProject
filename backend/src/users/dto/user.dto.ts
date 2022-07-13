import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  readonly email: string;
  @ApiProperty({ example: 'test123' })
  readonly password: string;
  @ApiProperty({ example: 'User name' })
  readonly name: string;
  @ApiProperty({ example: '123' })
  readonly id: string;
  @ApiProperty({ example: 'teacher' })
  readonly role: string;
  @ApiProperty({ example: 'teacher' })
  readonly avatar: any;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsOptional()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'User name' })
  @IsOptional()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'teacher' })
  @IsOptional()
  @IsNotEmpty()
  readonly avatar: any;
}
