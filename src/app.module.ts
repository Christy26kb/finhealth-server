import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppConfigModule } from './config/app/appConfig.module';

import { AppConfigService } from './config/app/appConfig.service';
import { DatabaseConfigModule } from './config/db/dbConfig.module';
/**
 * App Module
 *
 * @module
 */
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    AppConfigModule,
    DatabaseConfigModule,
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppModule {}
