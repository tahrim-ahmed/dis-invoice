import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, MaxLength} from 'class-validator';
import {BaseDto} from './core/base.dto';
import {CrudDto} from './core/crud.dto';

export class PermissionDto extends BaseDto {
    @ApiProperty()
    @MaxLength(100, {message: 'Maximum 100 characters supported'})
    name: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    client: CrudDto;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    group: CrudDto;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    invoice: CrudDto;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    product: CrudDto;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    stock: CrudDto;

    @ApiProperty()
    @IsNotEmpty({message: 'Must be non empty'})
    users: CrudDto;
}
