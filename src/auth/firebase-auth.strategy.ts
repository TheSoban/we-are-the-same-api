import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(FirebaseAuthStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      return await auth().verifyIdToken(token, true);
    } catch (err) {
      this.logger.warn(err);
      throw new UnauthorizedException();
    }
  }
}
