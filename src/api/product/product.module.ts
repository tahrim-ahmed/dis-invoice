import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './services/product.service';
import ProductSchema, {
  ProductEntity,
} from '../../package/schema/product.schema';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductSchema,
        collection: CollectionEnum.PRODUCTS,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, CreatedByAppendService],
})
export class ProductModule {}
