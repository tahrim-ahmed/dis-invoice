import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BaseDto } from './core/base.dto';
import { Types } from 'mongoose';

export class UserDto extends BaseDto {
    @ApiProperty()
    @IsString({ message: 'Must be a string' })
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    firstName: string;

    @ApiProperty()
    @IsString({ message: 'Must be a string' })
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Must be non empty' })
    @IsString({ message: 'Must be a string' })
    @MaxLength(100, { message: 'Maximum 100 characters supported' })
    password: string;

    @ApiProperty({ type: Types.ObjectId })
    @IsNotEmpty({ message: 'Group id must not be empty' })
    @IsMongoId()
    group: Types.ObjectId;

    @ApiProperty({ type: Types.ObjectId })
    @IsNotEmpty({ message: 'Permission id must not be empty' })
    @IsMongoId()
    permission: Types.ObjectId;
}
