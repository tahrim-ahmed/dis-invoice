import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { CollectionEnum } from '../enum/collection.enum';

@Schema()
export class InvoiceProductEntity {
  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionEnum.PRODUCTS })
  productID: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  unitPrice: number;

  @Prop({ type: Number, required: true })
  discount: number;
}

const InvoiceProductSchema = SchemaFactory.createForClass(InvoiceProductEntity);

export type InvoiceProductDocument = InvoiceProductEntity & mongoose.Document;

export default InvoiceProductSchema;
