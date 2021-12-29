import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema()
export class ProductEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: String, required: true })
  packSize: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

const ProductSchema = SchemaFactory.createForClass(ProductEntity);

ProductSchema.index({ code: 1 });

ProductSchema.path('productName').validate({
  validator: async function (value) {
    const count = await this.model(ProductEntity.name).countDocuments({
      productName: value,
    });
    return !count;
  },
  message: (props) => {
    return `'${props.value}' already exist`;
  },
});

export type ProductDocument = ProductEntity & mongoose.Document;

export default ProductSchema;
