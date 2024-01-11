import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '../../config/auth/auth-config.module';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './aws-cognito.service';
import { UsersModule } from '../users/users.module';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthConfigService } from '../../config/auth/auth-config.service';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { DatabaseConfigModule } from '../../config/db/db-config.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './auth.guard';
@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    DatabaseConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AwsCognitoService,
    AuthConfigService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
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
  exports: [JwtAuthGuard],
})
export class AuthModule {}
