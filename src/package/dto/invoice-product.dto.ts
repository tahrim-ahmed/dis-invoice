import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class InvoiceProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  productID: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsNumber()
  discount: number;
}
