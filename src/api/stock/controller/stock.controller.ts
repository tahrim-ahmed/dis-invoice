import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StockService } from '../services/stock.service';
import { PaginationDto } from '../../../package/dto/pagination/pagination.dto';
import { ParseObjectIdPipe } from '../../../package/pipes/parse-objectid.pipe';
import { StockDto } from '../../../package/dto/stock.dto';
import { StockEntity } from '../../../package/schema/stock.schema';

@ApiTags('Stock')
@ApiBearerAuth()
@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
        stockDto: StockDto,
    ) {
        return await this.stockService.createStock(stockDto);
    }

    @Get('pagination')
    async pagination(@Query() { skip, limit }: PaginationDto): Promise<StockEntity[]> {
        return this.stockService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<StockEntity[]> {
        return this.stockService.findById(id);
    }

    @Get('product/:id')
    async findByProductId(@Param('id') id: string): Promise<StockEntity[]> {
        return this.stockService.findByProductId(id);
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
        stockDto: StockDto,
    ) {
        return await this.stockService.update(id, stockDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<StockEntity> {
        return this.stockService.remove(id);
    }
}
