import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  InvoiceDocument,
  InvoiceEntity,
} from '../../../package/schema/invoice.schema';
import { InvoiceDto } from '../../../package/dto/invoice.dto';
import { CreatedByAppendService } from '../../../package/service/created-by-append.service';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectModel(InvoiceEntity.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly createdByAppendService: CreatedByAppendService,
  ) {}

  createInvoice = async (
    invoiceInput: InvoiceDto,
  ): Promise<InvoiceDocument> => {
    // saving and returning the saved data in mongo db
    try {
      invoiceInput.products = [...new Set(invoiceInput.products)];
      invoiceInput =
        this.createdByAppendService.createdBy<InvoiceDto>(invoiceInput);
      return await this.invoiceModel.create(invoiceInput);
    } catch (e) {
      return e;
    }
  };

  async pagination(skip = 0, limit?: number): Promise<InvoiceEntity[]> {
    const query = this.invoiceModel
      .find()
      .skip(skip)
      .populate('createdBy', 'email')
      .populate('products.productID', 'productName packSize')
      .populate('client', 'code name contact billing shipping email address');

    if (limit) {
      query.limit(limit);
    }

    return query;
  }

  /*************** custom () **********/
}
