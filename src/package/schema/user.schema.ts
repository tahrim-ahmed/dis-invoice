import * as mongoose from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { CollectionEnum } from '../enum/collection.enum';

@Schema({
  timestamps: true,
})
export class UserEntity {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
  createdBy: Types.ObjectId;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.index({ email: 1 });

UserSchema.path('email').validate({
  validator: async function (value) {
    const count = await this.model(UserEntity.name).countDocuments({
      email: value,
    });
    return !count;
  },
  message: (props) => {
    return `'${props.value}' already exist`;
  },
});

export type UserDocument = UserEntity & mongoose.Document;

export default UserSchema;
