import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './config/app/app-config.service';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  const appConfig: AppConfigService = app.get(AppConfigService, {
    strict: false,
  });

  // Swagger
  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.desc)
    .setVersion(appConfig.version)
    .addTag('Root')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // GLOBAL EXCEPTION FILTERS
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS
  app.enableCors();

  await app.listen(appConfig.port);
}
bootstrap();
