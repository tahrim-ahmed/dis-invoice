import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { CollectionEnum } from '../enum/collection.enum';

@Schema({
  timestamps: true,
})
export class ClientEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  contact: string;

  @Prop({ type: String, required: true })
  billing: string;

  @Prop({ type: String, required: true })
  shipping: string;

  @Prop({ type: String, required: false })
  email: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: CollectionEnum.USERS })
  createdBy: Types.ObjectId;
}

const ClientSchema = SchemaFactory.createForClass(ClientEntity);

ClientSchema.index({ code: 1 });

ClientSchema.path('code').validate({
  validator: async function (value) {
    const count = await this.model(ClientEntity.name).countDocuments({
      code: value,
    });
    return !count;
  },
  message: (props) => {
    return `'${props.value}' already exist`;
  },
});

export type ClientDocument = ClientEntity & mongoose.Document;

export default ClientSchema;
