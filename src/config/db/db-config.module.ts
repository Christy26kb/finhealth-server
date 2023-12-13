import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DBConfigService } from './db-config.service';
import BaseConfiguration from '../config';
import DatabaseConfiguration from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Multiple Database connections and services indexing module.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: BaseConfiguration.envFilePath,
      load: [DatabaseConfiguration],
    }),
  ],
  providers: [ConfigService, DBConfigService, PrismaService],
  exports: [DBConfigService, PrismaService],
})
export class DatabaseConfigModule {}
