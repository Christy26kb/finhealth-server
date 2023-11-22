import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { BaseConfigModule } from './config/config.module';
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
    BaseConfigModule,
  ],
  exports: [BaseConfigModule],
})
export class AppModule {}
