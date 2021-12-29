import { Module } from '@nestjs/common';
import { configEnvironment } from './package/env-config/env-config';
import { configMongo } from './package/mongo-config/mongo.config';
import { UserModule } from './api/user/user.module';
import { ClientModule } from './api/client/client.module';
import { InvoiceModule } from './api/invoice/invoice.module';

@Module({
  imports: [
    configEnvironment(),
    configMongo(),
    UserModule,
    ClientModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
