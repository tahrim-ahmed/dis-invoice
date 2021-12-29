import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClientDocument,
  ClientEntity,
} from '../../../package/schema/client.schema';
import { ClientDto } from '../../../package/dto/client.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectModel(ClientEntity.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  createClient = async (clientInput: ClientDto): Promise<ClientDocument> => {
    // saving and returning the saved data in mongo db
    try {
      return await this.clientModel.create(clientInput);
    } catch (e) {
      return e;
    }
  };

  /*************** custom () **********/
}
