import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with database configuration based operations.
 *
 * @class
 */
@Injectable()
export class DBConfigService {
  constructor(private configService: ConfigService) {}

  get provider(): string {
    return this.configService.get<string>('database.provider');
  }
  get supabase_url(): string {
    return this.configService.get<string>('database.supabase_db_url');
  }
}
