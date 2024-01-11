import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../config/db/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      _audience: process.env.AWS_COGNITO_CLIENT_ID,
      issuer: process.env.AWS_COGNITO_AUTHORITY,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AWS_COGNITO_AUTHORITY + '/.well-known/jwks.json',
      }),
      jsonWebTokenOptions: {
        complete: true,
      },
    });
  }

  async validate(data: any) {
    const { payload } = data;
    const user = await this.prismaService.users.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // TODO: More checks will go here, such as verifying roles, checking user status, etc.
    return user; // This user object will be available in req.user in the controller
  }
}
