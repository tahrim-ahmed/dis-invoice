import {Body, Controller, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UserService} from '../services/user.service';
import {LoginDto} from '../../../package/dto/login.dto';
import {UserDto} from '../../../package/dto/user.dto';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {UserEntity} from '../../../package/schema/user.schema';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';

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
    @Get('refresh')
    async refresh() {
        return await this.userService.refresh();
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

    @Put('update/:id')
    async update(
        @Param('id', new ParseObjectIdPipe()) id: string,
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
            userDto: UserDto,
    ) {
        return await this.userService.update(id, userDto);
    }
}
