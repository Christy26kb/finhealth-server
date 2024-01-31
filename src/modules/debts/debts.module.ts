import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Debts Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
