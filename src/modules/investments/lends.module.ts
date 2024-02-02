import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Investments Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
