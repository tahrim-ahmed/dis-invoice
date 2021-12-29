import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ClientDto } from './client.dto';

export class InvoiceDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  invoiceNo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  totalAmount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  client: ClientDto;
}
