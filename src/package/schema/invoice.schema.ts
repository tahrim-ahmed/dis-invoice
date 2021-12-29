import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ClientEntity } from './client.schema';
import { Type } from 'class-transformer';

@Schema()
export class InvoiceEntity {
  @Prop({ type: String, required: true })
  invoiceNo: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: ClientEntity.name })
  @Type(() => ClientEntity)
  client: ClientEntity;
}

const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);

InvoiceSchema.index({ code: 1 });

export type InvoiceDocument = InvoiceEntity & mongoose.Document;

export default InvoiceSchema;
