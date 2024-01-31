import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Subscriptions Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
