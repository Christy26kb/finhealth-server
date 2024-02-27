import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseConfigModule } from 'src/config/db/db-config.module';

@Module({
  imports: [DatabaseConfigModule, TerminusModule],
  providers: [ConfigService],
  controllers: [HealthController],
})
export class HealthModule {}
