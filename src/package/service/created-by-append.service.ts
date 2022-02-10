import {Inject, Injectable} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {BaseDto} from '../dto/core/base.dto';
import {Types} from 'mongoose';

@Injectable()
export class CreatedByAppendService {
    constructor(@Inject(REQUEST) private readonly request: Request) {
    }

    createdBy<T extends BaseDto>(dto: T): T {
        const user = this.request['_user'] || null;
        if (user) {
            dto.createdBy = new Types.ObjectId(user._id);
        } else {
            dto.createdBy = null;
        }
        return dto;
    }

    returnRequestToken() {
        const loggedInUser = this.request['_user'];
        const timeout = loggedInUser.exp - loggedInUser.iat;
        const time = new Date('1970-1-1').setSeconds(loggedInUser.exp);
        const now = new Date(time).getTime() - new Date().getTime();
        return now;
    }
}
