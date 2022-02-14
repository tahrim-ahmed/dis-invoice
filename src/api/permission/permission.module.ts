import { MongooseModule } from '@nestjs/mongoose';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './services/permission.service';
import { CreatedByAppendService } from '../../package/service/created-by-append.service';
import PermissionSchema, { PermissionEntity } from '../../package/schema/permission.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PermissionEntity.name,
                schema: PermissionSchema,
                collection: CollectionEnum.PERMISSION,
            },
        ]),
    ],
    controllers: [PermissionController],
    providers: [PermissionService, CreatedByAppendService],
})
export class PermissionModule {}
