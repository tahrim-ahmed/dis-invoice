import {Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {ProductService} from '../services/product.service';
import {ProductDto} from '../../../package/dto/product.dto';
import {PaginationDto} from '../../../package/dto/pagination/pagination.dto';
import {ParseObjectIdPipe} from '../../../package/pipes/parse-objectid.pipe';
import {ProductEntity} from '../../../package/schema/product.schema';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('create')
    async create(
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        )
        productDto: ProductDto,
    ) {
        return await this.productService.createProduct(productDto);
    }

    @Get('pagination')
    async pagination(@Query() { skip, limit }: PaginationDto): Promise<ProductEntity[]> {
        return this.productService.pagination(skip, limit);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ProductEntity[]> {
        return this.productService.findById(id);
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
        productDto: ProductDto,
    ) {
        return await this.productService.update(id, productDto);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<ProductEntity> {
        return this.productService.remove(id);
    }
}
