import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionEnum } from '../enum/collection.enum';
import { InvoiceProductDto } from '../dto/invoice-product.dto';
import InvoiceProductSchema from './invoice-product.schema';
import { ClientEntity } from './client.schema';
import { UserEntity } from './user.schema';

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

  @Prop({ type: SchemaTypes.ObjectId, ref: ClientEntity.name })
  client: Types.ObjectId;

  @Prop({ type: [InvoiceProductSchema] })
  products: InvoiceProductDto[];

  @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
  createdBy: Types.ObjectId;
}

const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);

InvoiceSchema.index({ invoiceNo: 1 });

InvoiceSchema.path('invoiceNo').validate({
  validator: async function (value) {
    const count = await this.model(InvoiceEntity.name).countDocuments({
      invoiceNo: value,
    });
    return !count;
  },
  message: (props) => {
    return `'${props.value}' already exist`;
  },
});

export type InvoiceDocument = InvoiceEntity & mongoose.Document;

export default InvoiceSchema;
