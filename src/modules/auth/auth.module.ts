import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from '../../config/auth/auth-config.module';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './aws-cognito.service';
@Module({
  imports: [
    AuthConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AwsCognitoService],
})
export class AuthModule {}
