import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/appConfig.module';
import { DatabaseModule } from './db/dbConfig.module';
/**
 * Import and provide main configuration related module.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule, DatabaseModule],
  exports: [AppConfigModule, DatabaseModule],
})
export class BaseConfigModule {}
