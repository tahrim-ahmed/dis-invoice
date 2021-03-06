import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { UserEntity } from './user.schema';

@Schema({
    timestamps: true,
})
export class ProductEntity {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ type: String, required: true })
    productName: string;

    @Prop({ type: String, required: true })
    packSize: string;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
    createdBy: Types.ObjectId;
}

const ProductSchema = SchemaFactory.createForClass(ProductEntity);

ProductSchema.index({ code: 1 });

export type ProductDocument = ProductEntity & mongoose.Document;

export default ProductSchema;
