import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceDto } from '../../../package/dto/invoice.dto';
import { InvoiceService } from '../services/invoice.service';

@ApiTags('Invoice')
@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

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
}
