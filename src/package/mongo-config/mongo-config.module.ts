import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// setting global mongo module
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE'),
        retryAttempts: 2,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class MongoConfigModule {}
