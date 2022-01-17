import {Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {ClientService} from '../services/client.service';
import {ClientDto} from '../../../package/dto/client.dto';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';
import {ClientEntity} from '../../../package/schema/client.schema';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {
    }

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
            clientDto: ClientDto,
    ) {
        return await this.clientService.createClient(clientDto);
    }

    @Get('pagination')
    async pagination(@Query() {skip, limit}: PaginationDto): Promise<ClientEntity[]> {
        return this.clientService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ClientEntity[]> {
        return this.clientService.findById(id);
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
            clientDto: ClientDto,
    ) {
        return await this.clientService.update(id, clientDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<ClientEntity> {
        return this.clientService.remove(id);
    }
}
