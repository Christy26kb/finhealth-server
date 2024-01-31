import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Expenses Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
