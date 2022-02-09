import {Body, Controller, Get, Post, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UserService} from '../services/user.service';
import {LoginDto} from '../../../package/dto/login.dto';
import {UserDto} from '../../../package/dto/user.dto';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {UserEntity} from '../../../package/schema/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

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

    @ApiBearerAuth()
    @Get('pagination')
    async pagination(@Query() {skip, limit}: PaginationDto): Promise<UserEntity[]> {
        return this.userService.pagination(skip, limit);
    }
}
