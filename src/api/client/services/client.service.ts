import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreatedByAppendService} from '../../../package/service/created-by-append.service';
import {ClientDocument, ClientEntity} from '../../../package/schema/client.schema';
import {ClientDto} from '../../../package/dto/client.dto';

@Injectable()
export class ClientService {
    private readonly logger = new Logger(ClientService.name);

    constructor(
        @InjectModel(ClientEntity.name)
        private readonly clientModel: Model<ClientDocument>,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {
    }

    createClient = async (clientInput: ClientDto): Promise<ClientDocument> => {
        // saving and returning the saved data in mongo db
        try {
            clientInput = this.createdByAppendService.createdBy<ClientDto>(clientInput);
            return await this.clientModel.create(clientInput);
        } catch (e) {
            return e;
        }
    };

    async search(search: string): Promise<ClientDocument[]> {
        //search = search.toLowerCase();
        let searchValue: any = search;
        try {
            searchValue = new RegExp([search].join(''), 'i');
        } catch (e) {
            const msg = 'Invalid Search Character!';

            throw new BadRequestException(msg);
        }

        return await this.clientModel
            .aggregate([
                {
                    $match: {
                        name: searchValue,
                    },
                },
            ])
            .exec();
    }

    async pagination(page: number, limit?: number): Promise<ClientDocument[]> {
        const query = this.clientModel.find().where({isActive: true});
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('createdBy', 'email');

        return await query.exec();
    }

    async update(id: string, clientData: ClientDto): Promise<ClientDocument> {
        return this.clientModel.findByIdAndUpdate(
            id,
            { ...clientData },
            {
                returnOriginal: false,
            },
        );
    }

    async remove(_id: string): Promise<ClientDocument> {
        try {
            return await this.clientModel.findByIdAndUpdate(
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
    async findById(_id: string): Promise<ClientDocument[]> {
        try {
            return await this.clientModel.findById(_id).where({ isActive: true }).populate('createdBy', 'email');
        } catch (error) {
            return error;
        }
    }
}
