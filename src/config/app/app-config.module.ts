import { Module } from '@nestjs/common';
import BaseConfiguration from '../config';
import AppConfiguration from './config';
import { AppConfigService } from './app-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: BaseConfiguration.envFilePath,
      load: [AppConfiguration],
    }),
  ],
  providers: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
