import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductDocument,
  ProductEntity,
} from '../../../package/schema/product.schema';
import { ProductDto } from '../../../package/dto/product.dto';
import { CreatedByAppendService } from '../../../package/service/created-by-append.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly createdByAppendService: CreatedByAppendService,
  ) {}

  createProduct = async (
    productInput: ProductDto,
  ): Promise<ProductDocument> => {
    // saving and returning the saved data in mongo db
    try {
      productInput =
        this.createdByAppendService.createdBy<ProductDto>(productInput);
      return await this.productModel.create(productInput);
    } catch (e) {
      return e;
    }
  };

  /*************** custom () **********/
}
