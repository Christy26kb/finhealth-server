import { Module } from '@nestjs/common';
import BaseConfiguration from '../config';
import AppConfiguration from './config';
import { AppConfigService } from './appConfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: BaseConfiguration.envFilePath,
      load: [AppConfiguration],
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
