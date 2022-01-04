import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceDto } from '../../../package/dto/invoice.dto';
import { InvoiceService } from '../services/invoice.service';
import { ResponseService } from '../../../package/service/response.service';
import { InvoiceEntity } from '../../../package/schema/invoice.schema';
import { PaginationDto } from '../../../package/dto/pagination/pagination.dto';

@ApiTags('Invoice')
@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly responseService: ResponseService,
  ) {}

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
  async pagination(
    @Query() { skip, limit }: PaginationDto,
  ): Promise<InvoiceEntity[]> {
    return this.invoiceService.pagination(skip, limit);
  }
}
