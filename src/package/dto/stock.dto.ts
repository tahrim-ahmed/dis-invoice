import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDto } from './core/base.dto';
import { Types } from 'mongoose';

export class StockDto extends BaseDto {
    @ApiProperty({ type: Types.ObjectId })
    @IsNotEmpty({ message: 'Product id must not be empty' })
    @IsMongoId()
    product: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Must be non empty' })
    @IsNumber()
    inStock: string;
}
