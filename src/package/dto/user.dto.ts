import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDto } from './core/base.dto';

export class UserDto extends BaseDto {
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
