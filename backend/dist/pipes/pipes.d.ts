import { PipeTransform } from '@nestjs/common';
export declare class QueryStringValidationPipe implements PipeTransform {
    transform(value: string): string;
}
