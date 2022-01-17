import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDto } from './core/base.dto';

export class ProductDto extends BaseDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Must be non empty' })
    @IsString({ message: 'Must be a string' })
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    productName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Must be non empty' })
    @IsString({ message: 'Must be a string' })
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    packSize: string;
}
