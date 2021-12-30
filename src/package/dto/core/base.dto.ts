import { Allow } from 'class-validator';
import { ActiveStatus } from '../../enum/active.enum';
import { Types } from 'mongoose';

export class BaseDto {
  @Allow()
  _id: string | Types.ObjectId;

  @Allow()
  __v: number;

  @Allow()
  isActive: ActiveStatus;

  @Allow()
  createdBy: string | null | Types.ObjectId;

  @Allow()
  createdAt: Date;

  @Allow()
  updatedAt: Date;
}
