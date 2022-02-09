import {Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {PermissionService} from '../services/permission.service';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';
import {PermissionDto} from '../../../package/dto/permission.dto';
import {PermissionEntity} from '../../../package/schema/permission.schema';

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {
    }

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
            permissionDto: PermissionDto,
    ) {
        return await this.permissionService.createPermission(permissionDto);
    }

    @Get('pagination')
    async pagination(@Query() {skip, limit}: PaginationDto): Promise<PermissionEntity[]> {
        return this.permissionService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<PermissionEntity[]> {
        return this.permissionService.findById(id);
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
            permissionDto: PermissionDto,
    ) {
        return await this.permissionService.update(id, permissionDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<PermissionEntity> {
        return this.permissionService.remove(id);
    }
}
