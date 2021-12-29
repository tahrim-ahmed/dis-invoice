import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  InvoiceDocument,
  InvoiceEntity,
} from '../../../package/schema/invoice.schema';
import { InvoiceDto } from '../../../package/dto/invoice.dto';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectModel(InvoiceEntity.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  createInvoice = async (
    invoiceInput: InvoiceDto,
  ): Promise<InvoiceDocument> => {
    // saving and returning the saved data in mongo db
    try {
      return await this.invoiceModel.create(invoiceInput);
    } catch (e) {
      return e;
    }
  };

  /*************** custom () **********/
}
