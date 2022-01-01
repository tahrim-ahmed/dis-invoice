import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceDto } from '../../../package/dto/invoice.dto';
import { InvoiceService } from '../services/invoice.service';
import { ResponseDto } from '../../../package/dto/response/response.dto';
import { ResponseService } from '../../../package/service/response.service';
import { InvoiceEntity } from '../../../package/schema/invoice.schema';

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
  async findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceService.findAll();
  }
}
