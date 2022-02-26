import {Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreatedByAppendService} from '../../../package/service/created-by-append.service';
import {StockDto} from '../../../package/dto/stock.dto';
import {StockDocument, StockEntity} from '../../../package/schema/stock.schema';

@Injectable()
export class StockService {
    private readonly logger = new Logger(StockService.name);

    constructor(
        @InjectModel(StockEntity.name)
        private readonly stockModel: Model<StockDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {
    }

    createStock = async (stockInput: StockDto): Promise<StockDocument> => {
        // saving and returning the saved data in mongo db
        try {
            stockInput = this.createdByAppendService.createdBy<StockDto>(stockInput);
            return await this.stockModel.create(stockInput);
        } catch (e) {
            return e;
        }
    };

    async pagination(page: number, limit?: number): Promise<StockDocument[]> {
        const query = this.stockModel.find().where({ isActive: true });
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('product', 'productName packSize').populate('createdBy', 'email');

        return await query.exec();
    }

    async update(id: string, stockData: StockDto): Promise<StockDocument> {
        const previousStock = await this.findById(id);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        stockData.inStock = previousStock.inStock + stockData.inStock;
        return this.stockModel.findByIdAndUpdate(
            id,
            { ...stockData },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<StockDocument> {
        try {
            return await this.stockModel.findByIdAndUpdate(
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
    async findById(_id: string): Promise<StockDocument[]> {
        try {
            return await this.stockModel
                .findById(_id)
                .where({ isActive: true })
                .populate('product', 'productName packSize')
                .populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }

    async findByProductId(_id: string): Promise<StockDocument[]> {
        try {
            return await this.stockModel
                .find({ product: _id })
                .where({ isActive: true })
                .populate('product', 'productName packSize')
                .populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }
}
