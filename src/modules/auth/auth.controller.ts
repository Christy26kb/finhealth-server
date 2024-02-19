import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthLoginUserDto } from './dtos/auth-login-user.dto';
import { AuthRegisterUserDto } from './dtos/auth-register-user.dto';
import { AuthVerifyUserDto } from './dtos/auth-verify-user.dto';
import { AuthUserRefreshTokenDto } from './dtos/auth-user-refresh-token.dto';
@Controller('auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.awsCognitoService.signupUser(authRegisterUserDto);
  }

  @Post('/verify')
  @UsePipes(ValidationPipe)
  async verify(@Body() authVerifyUserDto: AuthVerifyUserDto) {
    return await this.awsCognitoService.verifyUser(authVerifyUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
  }

  @Post('/refresh')
  @UsePipes(ValidationPipe)
  async refreshToken(@Body() userRefreshTokenDto: AuthUserRefreshTokenDto) {
    return await this.awsCognitoService.refreshTokens(userRefreshTokenDto);
  }
}
