import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionEnum } from '../enum/collection.enum';
import { InvoiceProductDto } from '../dto/invoice-product.dto';

@Schema({
  timestamps: true,
})
export class InvoiceEntity {
  @Prop({ type: String, required: true })
  invoiceNo: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: String, required: true })
  paymentType: string;

  @Prop({ type: Date, required: false })
  creditPeriod: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionEnum.CLIENTS })
  client: Types.ObjectId;

  @Prop({ type: [Object] })
  products: InvoiceProductDto[];

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionEnum.USERS })
  createdBy: Types.ObjectId;
}

const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);

InvoiceSchema.index({ invoiceNo: 1 });

export type InvoiceDocument = InvoiceEntity & mongoose.Document;

export default InvoiceSchema;
