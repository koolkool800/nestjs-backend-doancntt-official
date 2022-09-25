import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log('user ', user);

    if (err || !user) {
      console.log('un auth 1');
      throw new HttpException(info, HttpStatus.UNAUTHORIZED);
    }
    console.log('co user', user);
    return user;
  }
}
