import {ApiProperty} from '@nestjs/swagger';
import {Allow, IsArray, IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, ValidateIf} from 'class-validator';
import {Types} from 'mongoose';
import {PaymentEnum} from '../enum/payment.enum';
import {BaseDto} from './core/base.dto';
import {InvoiceProductDto} from './invoice-product.dto';
import {PaymentStatusEnum} from '../enum/payment-status.enum';

export class InvoiceDto extends BaseDto {
    @Allow()
    invoiceNo: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    @IsNumber({maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false}, {message: 'Must be a decimal'})
    totalAmount: number;

    @ApiProperty({default: 1})
    @IsDefined({message: 'Payment type must be defined'})
    @IsEnum(PaymentEnum, {message: 'Must be between 1 or 0'})
    paymentType: PaymentEnum;

    @ApiProperty()
    paymentStatus: PaymentStatusEnum;

    @ApiProperty()
    @ValidateIf((o) => o.paymentType === PaymentEnum.credit)
    @IsOptional()
    creditPeriod?: Date;

    @ApiProperty({type: Types.ObjectId})
    @IsNotEmpty({message: 'Client id must not be empty'})
    @IsMongoId()
    client: Types.ObjectId;

    @ApiProperty({ type: [InvoiceProductDto] })
    @IsArray()
    @IsNotEmpty({ each: true })
    products: InvoiceProductDto[];
}
