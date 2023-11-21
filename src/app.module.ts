import { Module } from '@nestjs/common';
import { BaseConfigModule } from './config/config.module';
/**
 * App Module
 *
 * @module
 */
@Module({
  imports: [BaseConfigModule],
})
export class AppModule {}
