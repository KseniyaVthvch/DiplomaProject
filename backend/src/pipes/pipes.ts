import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class QueryStringValidationPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Value must be a string');
    }
    return value;
  }
}
