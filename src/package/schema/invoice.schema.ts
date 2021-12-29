import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ClientEntity } from './client.schema';
import { Type } from 'class-transformer';
import { ProductEntity } from './product.schema';

@Schema()
export class InvoiceEntity {
  @Prop({ type: String, required: true })
  invoiceNo: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: String, required: true })
  paymentType: string;

  @Prop({ type: Date, required: false })
  creditPeriod: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: ClientEntity.name })
  @Type(() => ClientEntity)
  client: ClientEntity;

  @Prop({ type: Types.ObjectId, ref: ProductEntity.name })
  @Type(() => ProductEntity)
  product: ProductEntity[];
}

const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);

InvoiceSchema.index({ code: 1 });

export type InvoiceDocument = InvoiceEntity & mongoose.Document;

export default InvoiceSchema;
