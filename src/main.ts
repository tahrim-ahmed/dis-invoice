import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
    const logger = new Logger('Invoice-api-bootstrap');

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
        .setTitle('Invoice')
        .setDescription('The Invoice API description')
        .setVersion('1.0')
        .addTag('shako-invoice')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('dis-api', app, document);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');

    app.enableCors();

    await app.listen(port);

    logger.log(`Documentation is running in http://localhost:${port}/dis-api`);
    logger.log(`Api is running in http://localhost:${port}`);
}
bootstrap();
