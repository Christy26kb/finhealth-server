import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import { AuthLoginUserDto } from './dtos/auth-login-user.dto';
import { AuthRegisterUserDto } from './dtos/auth-register-user.dto';
import { AuthVerifyUserDto } from './dtos/auth-verify-user.dto';
import { AuthConfigService } from '../../config/auth/auth-config.service';
import { PrismaService } from '../../config/db/prisma/prisma.service';

@Injectable()
export class AwsCognitoService {
  constructor(
    private userPool: CognitoUserPool,
    private authConfigService: AuthConfigService,
    private prismaService: PrismaService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfigService.userPoolId,
      ClientId: this.authConfigService.clientId,
    });
  }

  async signupUser(authRegisterUserDto: AuthRegisterUserDto) {
    const { name, email, password } = authRegisterUserDto;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
        ],
        null,
        async (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(
              await this.prismaService.users.create({
                data: {
                  id: result.userSub,
                  email,
                  name,
                },
              }),
            );
          }
        },
      );
    });
  }

  async verifyUser(authVerifyUserDto: AuthVerifyUserDto) {
    return new Promise((resolve, reject) => {
      const { email, code } = authVerifyUserDto;
      return new CognitoUser({
        Username: email,
        Pool: this.userPool,
      }).confirmRegistration(code, true, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
