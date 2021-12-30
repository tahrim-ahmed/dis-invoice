import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { ClientController } from './controller/client.controller';
import { ClientService } from './services/client.service';
import ClientSchema, { ClientEntity } from '../../package/schema/client.schema';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClientEntity.name,
        schema: ClientSchema,
        collection: CollectionEnum.CLIENTS,
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService, CreatedByAppendService],
})
export class ClientModule {}
