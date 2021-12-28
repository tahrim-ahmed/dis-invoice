import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { UserEntity } from '../../package/schema/user.schema';
import { CollectionEnum } from '../../package/enum/collection.enum';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { BcryptService } from './services/bcrypt.service';
import { NotFoundService } from '../../package/service/not-found.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
        collection: CollectionEnum.USERS,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, BcryptService, NotFoundService],
})
export class UserModule {}
