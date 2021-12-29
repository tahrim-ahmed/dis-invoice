import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ClientDto {
  @ApiProperty()
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  code: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  contact: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  billing: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  shipping: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  email: string;
}
