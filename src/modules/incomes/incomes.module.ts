import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Incomes Module
 *
 * @module
 */
@Module({
  imports: [DatabaseConfigModule],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
