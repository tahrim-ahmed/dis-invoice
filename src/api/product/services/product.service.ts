import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {ProductDocument, ProductEntity} from '../../../package/schema/product.schema';
import {ProductDto} from '../../../package/dto/product.dto';
import {CreatedByAppendService} from '../../../package/service/created-by-append.service';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectModel(ProductEntity.name)
        private readonly productModel: Model<ProductDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {
    }

    createProduct = async (productInput: ProductDto): Promise<ProductDocument> => {
        // saving and returning the saved data in mongo db
        try {
            productInput = this.createdByAppendService.createdBy<ProductDto>(productInput);
            return await this.productModel.create(productInput);
        } catch (e) {
            return e;
        }
    };

    async search(search: string): Promise<ProductDocument[]> {
        //search = search.toLowerCase();
        let searchValue: any = search;
        try {
            searchValue = new RegExp([search].join(''), 'i');
        } catch (e) {
            const msg = 'Invalid Search Character!';

            throw new BadRequestException(msg);
        }

        return await this.productModel
            .aggregate([
                {
                    $match: {
                        productName: searchValue,
                    },
                },
            ])
            .exec();
    }

    async pagination(page: number, limit?: number): Promise<ProductDocument[]> {
        const query = this.productModel.find().where({isActive: true});
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('createdBy', 'email');

        return await query.exec();
    }

    async update(id: string, productData: ProductDto): Promise<ProductDocument> {
        return this.productModel.findByIdAndUpdate(
            id,
            { ...productData },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<ProductDocument> {
        try {
            return await this.productModel.findByIdAndUpdate(
                _id,
                {
                    $set: { isActive: false },
                },
                {
                    returnOriginal: false,
                },
            );
        } catch (error) {
            return error;
        }
    }

    /*************** custom () **********/
    async findById(_id: string): Promise<ProductDocument[]> {
        try {
            return await this.productModel.findById(_id).where({ isActive: true }).populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }
}
