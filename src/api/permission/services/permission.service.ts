import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatedByAppendService } from '../../../package/service/created-by-append.service';
import { PermissionDocument, PermissionEntity } from '../../../package/schema/permission.schema';
import { PermissionDto } from '../../../package/dto/permission.dto';

@Injectable()
export class PermissionService {
    private readonly logger = new Logger(PermissionService.name);

    constructor(
        @InjectModel(PermissionEntity.name)
        private readonly permissionModel: Model<PermissionDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {}

    createPermission = async (permissionDto: PermissionDto): Promise<PermissionDocument> => {
        // saving and returning the saved data in mongo db
        try {
            permissionDto = this.createdByAppendService.createdBy<PermissionDto>(permissionDto);
            return await this.permissionModel.create(permissionDto);
        } catch (e) {
            return e;
        }
    };

    async search(search: string): Promise<PermissionDocument[]> {
        //search = search.toLowerCase();
        let searchValue: any = search;
        try {
            searchValue = new RegExp([search].join(''), 'i');
        } catch (e) {
            const msg = 'Invalid Search Character!';

            throw new BadRequestException(msg);
        }

        console.log(searchValue);
        return await this.permissionModel
            .aggregate([
                {
                    $match: {
                        name: searchValue,
                    },
                },
            ])
            .exec();
    }

    async pagination(page: number, limit?: number): Promise<PermissionDocument[]> {
        const query = this.permissionModel.find().where({ isActive: true });
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('createdBy', 'email');

        return await query.exec();
    }

    async update(id: string, permissionDto: PermissionDto): Promise<PermissionDocument> {
        return this.permissionModel.findByIdAndUpdate(
            id,
            { ...permissionDto },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<PermissionDocument> {
        try {
            return await this.permissionModel.findByIdAndUpdate(
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
    async findById(_id: any): Promise<PermissionDocument[]> {
        try {
            return await this.permissionModel.findById(_id).where({ isActive: true }).populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }
}
