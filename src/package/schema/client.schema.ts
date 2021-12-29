import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema()
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

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
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
