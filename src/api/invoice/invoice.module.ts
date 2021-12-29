import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import InvoiceSchema, {
  InvoiceEntity,
} from '../../package/schema/invoice.schema';
import { InvoiceService } from './services/invoice.service';
import { InvoiceController } from './controller/invoice.controller';

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
  providers: [InvoiceService],
})
export class InvoiceModule {}
