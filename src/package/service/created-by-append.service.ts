import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseDto } from '../dto/core/base.dto';
import { Types } from 'mongoose';

@Injectable()
export class CreatedByAppendService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  createdBy<T extends BaseDto>(dto: T): T {
    const user = this.request['_user'] || null;
    if (user) {
      dto.createdBy = new Types.ObjectId(user._id);
    } else {
      dto.createdBy = null;
    }
    return dto;
  }
}
