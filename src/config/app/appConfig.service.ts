import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with application config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('application.name');
  }
  get env(): string {
    return this.configService.get<string>('application.env');
  }
  get url(): string {
    return this.configService.get<string>('application.url');
  }
  get port(): number {
    return Number(this.configService.get<number>('application.port'));
  }
  get desc(): string {
    return this.configService.get<string>('application.desc');
  }
  get version(): string {
    return this.configService.get<string>('application.version');
  }
}
