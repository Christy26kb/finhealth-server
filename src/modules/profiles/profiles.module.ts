import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '../../config/db/db-config.module';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';

/**
 * Profiles Module
 *
 * @module
 */

@Module({
  imports: [DatabaseConfigModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
