import { Module } from '@nestjs/common';
import { LendsService } from './lends.service';
import { LendsController } from './lends.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Lends Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [LendsController],
  providers: [LendsService],
})
export class LendsModule {}
