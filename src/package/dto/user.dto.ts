import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Must be non empty' })
  @IsString({ message: 'Must be a string' })
  @MaxLength(100, { message: 'Maximum 100 characters supported' })
  password: string;
}
