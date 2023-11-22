import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './config/app/appConfig.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const appConfig: AppConfigService = app.get('AppConfigService');

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.desc)
    .setVersion(appConfig.version)
    .addTag('Root')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // CORS
  app.enableCors();

  await app.listen(appConfig.port);
}
bootstrap();
