import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import { PaymentEnum } from '../enum/payment.enum';
import { BaseDto } from './core/base.dto';
import { InvoiceProductDto } from './invoice-product.dto';

export class InvoiceDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  invoiceNo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false },
    { message: 'Must be a decimal' },
  )
  totalAmount: number;

  @ApiProperty({ default: 1 })
  @IsDefined({ message: 'Payment type must be defined' })
  @IsEnum(PaymentEnum, { message: 'Must be between 1 or 0' })
  paymentType: PaymentEnum;

  @ApiProperty()
  @ValidateIf((o) => o.paymentType === PaymentEnum.credit)
  @IsDateString({ strict: true }, { message: 'Must be a valid Date' })
  creditPeriod: Date;

  @ApiProperty({ type: Types.ObjectId })
  @IsNotEmpty({ message: 'Client id must not be empty' })
  @IsMongoId()
  client: Types.ObjectId;

  @ApiProperty({ type: [InvoiceProductDto] })
  @IsArray()
  @IsNotEmpty({ each: true })
  products: InvoiceProductDto[];
}
