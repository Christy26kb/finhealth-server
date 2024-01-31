import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseConfigModule } from '../../config/db/db-config.module';

/**
 * Categories Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
