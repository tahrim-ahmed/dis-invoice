import {Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GroupService} from '../services/group.service';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';
import {GroupDto} from '../../../package/dto/group.dto';
import {GroupEntity} from '../../../package/schema/group.schema';

@ApiTags('Group')
@ApiBearerAuth()
@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {
    }

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
            groupDto: GroupDto,
    ) {
        return await this.groupService.createGroup(groupDto);
    }

    @Get('pagination')
    async pagination(@Query() {skip, limit}: PaginationDto): Promise<GroupEntity[]> {
        return this.groupService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<GroupEntity[]> {
        return this.groupService.findById(id);
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
            groupDto: GroupDto,
    ) {
        return await this.groupService.update(id, groupDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<GroupEntity> {
        return this.groupService.remove(id);
    }
}
