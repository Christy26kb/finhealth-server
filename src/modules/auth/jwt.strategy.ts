import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfigService } from '../../config/auth/auth-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private secretOrKeyProvider: any;

  constructor(private authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });

    this.setupSecretOrKeyProvider();
  }

  private setupSecretOrKeyProvider() {
    this.secretOrKeyProvider = passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri:
        this.authConfigService.cognitoAuthority + '/.well-known/jwks.json',
    });
  }

  async validate(payload: any) {
    return { idUser: payload.sub, email: payload.email };
  }
}
