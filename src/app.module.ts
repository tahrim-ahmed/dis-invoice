import { Module } from '@nestjs/common';
import { configEnvironment } from './package/env-config/env-config';
import { configMongo } from './package/mongo-config/mongo.config';
import { UserModule } from './api/user/user.module';
import { NotFoundService } from './package/service/not-found.service';

@Module({
  imports: [configEnvironment(), configMongo(), UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
