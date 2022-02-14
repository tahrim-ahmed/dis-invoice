import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { GroupController } from './controller/group.controller';
import { GroupService } from './services/group.service';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';
import GroupSchema, { GroupEntity } from '../../package/schema/group.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: GroupEntity.name,
                schema: GroupSchema,
                collection: CollectionEnum.GROUPS,
            },
        ]),
    ],
    controllers: [GroupController],
    providers: [GroupService, CreatedByAppendService],
})
export class GroupModule {}
