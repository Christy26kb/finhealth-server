import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with authentication configuration based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get provider(): string {
    return this.configService.get<string>('auth.auth_provider');
  }

  get userPoolId(): string {
    return this.configService.get<string>('auth.cognito_user_pool_id');
  }

  get clientId(): string {
    return this.configService.get<string>('auth.cognito_client_id');
  }
}
