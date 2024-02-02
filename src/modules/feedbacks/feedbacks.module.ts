import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Feedbacks Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
