import { Module } from '@nestjs/common';
import BaseConfiguration from '../config';
import AppConfiguration from './config';
import { AppConfigService } from './appConfig.service';
import { ConfigModule } from '@nestjs/config';
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
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
