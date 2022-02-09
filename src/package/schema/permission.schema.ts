import * as mongoose from 'mongoose';
import {SchemaTypes, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {UserEntity} from './user.schema';
import {CrudDto} from '../dto/core/crud.dto';

@Schema({
    timestamps: true,
})
export class PermissionEntity {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Object})
    client: CrudDto;

    @Prop({type: Object})
    group: CrudDto;

    @Prop({type: Object})
    invoice: CrudDto;

    @Prop({type: Object})
    product: CrudDto;

    @Prop({type: Object})
    stock: CrudDto;

    @Prop({type: Object})
    users: CrudDto;

    @Prop({type: Boolean, default: true})
    isActive: boolean;

    @Prop({type: SchemaTypes.ObjectId, ref: UserEntity.name})
    createdBy: Types.ObjectId;
}

const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);

PermissionSchema.index({name: 1});

PermissionSchema.path('name').validate({
    validator: async function (value) {
        const count = await this.model(PermissionEntity.name).countDocuments({
            name: value,
        });
        return !count;
    },
    message: (props) => {
        return `'${props.value}' already exist`;
    },
});

export type PermissionDocument = PermissionEntity & mongoose.Document;

export default PermissionSchema;
