import { Module } from '@nestjs/common';
import BaseConfiguration from '../config';
import AuthConfiguration from './config';
import { AuthConfigService } from './auth-config.service';
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
      load: [AuthConfiguration],
    }),
  ],
  providers: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
