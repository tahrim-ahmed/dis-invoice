import * as mongoose from 'mongoose';
import {SchemaTypes, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Transform} from 'class-transformer';

@Schema({
    timestamps: true,
})
export class GroupEntity {
    @Transform(({value}) => value.toString())
    _id: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Boolean, default: true})
    isActive: boolean;

    @Prop({type: SchemaTypes.ObjectId, ref: 'UserEntity'})
    createdBy: Types.ObjectId;
}

const GroupSchema = SchemaFactory.createForClass(GroupEntity);

GroupSchema.index({name: 1});

export type GroupDocument = GroupEntity & mongoose.Document;

export default GroupSchema;
