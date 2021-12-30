import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { LoginDto } from '../../../package/dto/login.dto';
import { UserDto } from '../../../package/dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    loginDto: LoginDto,
  ) {
    return await this.userService.login(loginDto);
  }

  @ApiBearerAuth()
  @Post('register')
  async register(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    registerDto: UserDto,
  ) {
    return await this.userService.register(registerDto);
  }
}
