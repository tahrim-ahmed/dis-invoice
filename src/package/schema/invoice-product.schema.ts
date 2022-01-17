import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { ProductEntity } from './product.schema';

@Schema({
    _id: false,
})
export class InvoiceProductEntity {
    @Prop({ type: SchemaTypes.ObjectId, ref: ProductEntity.name })
    productID: Types.ObjectId;

    @Prop({ type: Number, required: true })
    quantity: number;

    @Prop({ type: Number, required: true })
    unitPrice: number;

    @Prop({ type: Number, required: true })
    discount: number;
}

const InvoiceProductSchema = SchemaFactory.createForClass(InvoiceProductEntity);

export default InvoiceProductSchema;
