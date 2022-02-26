import {Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {InvoiceDto} from '../../../package/dto/invoice.dto';
import {InvoiceService} from '../services/invoice.service';
import {ResponseService} from '../../../package/service/response.service';
import {InvoiceEntity} from '../../../package/schema/invoice.schema';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';

@ApiTags('Invoice')
@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService, private readonly responseService: ResponseService) {
    }

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
        invoiceDto: InvoiceDto,
    ) {
        return await this.invoiceService.createInvoice(invoiceDto);
    }

    @Get('pagination')
    async pagination(@Query() { skip, limit }: PaginationDto): Promise<InvoiceEntity[]> {
        return this.invoiceService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<InvoiceEntity[]> {
        return this.invoiceService.findById(id);
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
        invoiceDto: InvoiceDto,
    ) {
        return await this.invoiceService.update(id, invoiceDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<InvoiceEntity> {
        return this.invoiceService.remove(id);
    }
}
