import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './config/app/app-config.service';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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

  // CORS options
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3001'], // Whitelisted origins
    methods: ['GET', 'PUT', 'POST', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow sending cookies from the client
  };

  // CORS
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api/v1');
  await app.listen(appConfig.port);
}
bootstrap();
