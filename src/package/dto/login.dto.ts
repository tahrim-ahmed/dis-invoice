import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { UserDto } from './user.dto';
import { BoolEnum } from '../enum/bool.enum';

export class LoginDto extends UserDto {
  @ApiProperty({ default: 1 })
  @IsInt({ message: 'Must be an integer value' })
  @IsEnum(BoolEnum, { message: 'Can be either 0 or 1' })
  isRemembered: BoolEnum;
}
