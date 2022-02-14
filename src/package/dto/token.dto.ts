import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TokenDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    timeout: Date;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Group id must not be empty' })
    @IsMongoId()
    group: Types.ObjectId;

    @ApiProperty()
    @IsNotEmpty({ message: 'Permission id must not be empty' })
    @IsMongoId()
    permission: Types.ObjectId;
}
