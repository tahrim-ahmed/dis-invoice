import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { StockService } from './services/stock.service';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';
import StockSchema, { StockEntity } from '../../package/schema/stock.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: StockEntity.name,
                schema: StockSchema,
                collection: CollectionEnum.STOCK,
            },
        ]),
    ],
    controllers: [StockController],
    providers: [StockService, CreatedByAppendService],
})
export class StockModule {}
