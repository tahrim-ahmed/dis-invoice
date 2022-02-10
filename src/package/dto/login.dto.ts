import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import {BoolEnum} from '../enum/bool.enum';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @MaxLength(100, {message: 'Maximum 100 characters supported'})
    email: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    @IsString({message: 'Must be a string'})
    @MaxLength(100, {message: 'Maximum 100 characters supported'})
    password: string;

    @ApiProperty({default: 1})
    @IsInt({message: 'Must be an integer value'})
    @IsEnum(BoolEnum, {message: 'Can be either 0 or 1'})
    isRemembered: BoolEnum;
}
