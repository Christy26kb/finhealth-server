import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { DiskOptions, HealthChecks, MemoryThreshold } from 'src/types';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaService: PrismaService,
    private db: PrismaHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      () => this.db.pingCheck(HealthChecks.PRISMA_SUPABASE, this.prismaService),
      () => this.disk.checkStorage(HealthChecks.STORAGE_DISK, DiskOptions),
      () => this.memory.checkHeap(HealthChecks.MEMORY_HEAP, MemoryThreshold),
    ]);
  }
}
