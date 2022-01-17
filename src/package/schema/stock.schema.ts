import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { UserEntity } from './user.schema';
import { ProductEntity } from './product.schema';

@Schema({
    timestamps: true,
})
export class StockEntity {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: ProductEntity.name })
    product: Types.ObjectId;

    @Prop({ type: Number, required: true })
    inStock: number;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
    createdBy: Types.ObjectId;
}

const StockSchema = SchemaFactory.createForClass(StockEntity);

StockSchema.index({ product: 1 });

export type StockDocument = StockEntity & mongoose.Document;

export default StockSchema;
