import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { configEnvironment } from './package/env-config/env-config';
import { configMongo } from './package/mongo-config/mongo.config';
import { UserModule } from './api/user/user.module';
import { ClientModule } from './api/client/client.module';
import { InvoiceModule } from './api/invoice/invoice.module';
import { ProductModule } from './api/product/product.module';
import { AuthMiddleware } from './package/middlewares/auth.middleware';
import { publicUrls } from './public.url';

@Module({
  imports: [
    configEnvironment(),
    configMongo(),
    UserModule,
    ClientModule,
    ProductModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...publicUrls)
      .forRoutes('*');
  }
}
