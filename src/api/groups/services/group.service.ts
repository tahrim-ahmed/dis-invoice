import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreatedByAppendService} from '../../../package/service/created-by-append.service';
import {GroupDocument, GroupEntity} from '../../../package/schema/group.schema';
import {GroupDto} from '../../../package/dto/group.dto';

@Injectable()
export class GroupService {
    private readonly logger = new Logger(GroupService.name);

    constructor(
        @InjectModel(GroupEntity.name)
        private readonly groupModel: Model<GroupDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {
    }

    createGroup = async (groupDto: GroupDto): Promise<GroupDocument> => {
        // saving and returning the saved data in mongo db
        try {
            groupDto = this.createdByAppendService.createdBy<GroupDto>(groupDto);
            return await this.groupModel.create(groupDto);
        } catch (e) {
            return e;
        }
    };

    async search(search: string): Promise<GroupDocument[]> {
        //search = search.toLowerCase();
        let searchValue: any = search;
        try {
            searchValue = new RegExp([search].join(''), 'i');
        } catch (e) {
            const msg = 'Invalid Search Character!';

            throw new BadRequestException(msg);
        }

        return await this.groupModel
            .aggregate([
                {
                    $match: {
                        name: searchValue,
                    },
                },
            ])
            .exec();
    }

    async pagination(page: number, limit?: number): Promise<GroupDocument[]> {
        const query = this.groupModel.find().where({ isActive: true });
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('createdBy', 'email');

        return await query.exec();
    }

    async update(id: string, groupDto: GroupDto): Promise<GroupDocument> {
        return this.groupModel.findByIdAndUpdate(
            id,
            { ...groupDto },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<GroupDocument> {
        try {
            return await this.groupModel.findByIdAndUpdate(
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
    async findById(_id: any): Promise<GroupDocument[]> {
        try {
            return await this.groupModel.findById(_id).where({ isActive: true }).populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }
}
