import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfigService } from '../../config/auth/auth-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwtOptions: any;

  constructor(private authConfigService: AuthConfigService) {
    const initialOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // ... other options
    };

    super(initialOptions);

    // Perform additional setup after the super() call
    this.jwtOptions = {
      ...initialOptions,
      _audience: this.authConfigService.clientId,
      issuer: this.authConfigService.cognitoAuthority,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
          this.authConfigService.cognitoAuthority + '/.well-known/jwks.json',
      }),
    };
  }

  async validate(payload: any) {
    return { idUser: payload.sub, email: payload.email };
  }
}
