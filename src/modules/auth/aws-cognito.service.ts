import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

import { AuthLoginUserDto } from './dtos/auth-login-user.dto';
import { AuthRegisterUserDto } from './dtos/auth-register-user.dto';
import { AuthVerifyUserDto } from './dtos/auth-verify-user.dto';
import { AuthUserRefreshTokenDto } from './dtos/auth-user-refresh-token.dto';
import { AuthConfigService } from '../../config/auth/auth-config.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AwsCognitoService {
  constructor(
    private userPool: CognitoUserPool,
    private authConfigService: AuthConfigService,
    private usersService: UsersService,
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
              await this.usersService.create({
                id: result.userSub,
                email,
                name,
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

  async refreshTokens(userRefreshTokenDto: AuthUserRefreshTokenDto) {
    const cognitoUser = new CognitoUser({
      Username: 'dummy', // This can be any dummy value
      Pool: this.userPool,
    });
    const refreshTokenObj = new CognitoRefreshToken({
      RefreshToken: userRefreshTokenDto.refreshToken,
    });
    return await new Promise((resolve, reject) => {
      cognitoUser.refreshSession(refreshTokenObj, (err, session) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            accessToken: session.accessToken.jwtToken,
            idToken: session.idToken.jwtToken,
            refreshToken: session.refreshToken.token,
          });
        }
      });
    });
  }
}
