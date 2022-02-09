import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean} from 'class-validator';

export class CrudDto {
    @ApiProperty()
    @IsBoolean()
    add: boolean;

    @ApiProperty()
    @IsBoolean()
    edit: boolean;

    @ApiProperty()
    @IsBoolean()
    update: boolean;

    @ApiProperty()
    @IsBoolean()
    delete: boolean;
}
