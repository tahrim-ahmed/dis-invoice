import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import InvoiceSchema, {
  InvoiceEntity,
} from '../../package/schema/invoice.schema';
import { InvoiceService } from './services/invoice.service';
import { InvoiceController } from './controller/invoice.controller';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InvoiceEntity.name,
        schema: InvoiceSchema,
        collection: CollectionEnum.INVOICES,
      },
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, CreatedByAppendService],
})
export class InvoiceModule {}
