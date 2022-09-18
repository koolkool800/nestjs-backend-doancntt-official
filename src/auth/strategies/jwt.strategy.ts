import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { IJWTPayload } from '../entities/auth.entity';
@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(public config: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: IJWTPayload): Promise<User> {
    console.log('validate : ', payload);
    const findUser = this.userService.getUserById({ id: payload._id });
    console.log('user in validate : ', findUser);

    return findUser ? findUser : null;
  }
}
