import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from 'src/config/db/db-config.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Users Module
 *
 * @module
 */
@Module({
  imports: [DatabaseConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
