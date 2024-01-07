import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '../../config/auth/auth-config.module';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './aws-cognito.service';
import { UsersModule } from '../users/users.module';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthConfigService } from '../../config/auth/auth-config.service';
@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AwsCognitoService,
    AuthConfigService,
    {
      provide: CognitoUserPool,
      useFactory: (authConfigService: AuthConfigService) => {
        return new CognitoUserPool({
          UserPoolId: authConfigService.userPoolId,
          ClientId: authConfigService.clientId,
        });
      },
      inject: [AuthConfigService],
    },
  ],
})
export class AuthModule {}
