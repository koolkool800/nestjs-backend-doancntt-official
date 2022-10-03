import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';
// import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { IJWTPayload } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/constants/enum';
import { IUser } from 'src/modules/user/interfaces/user';
import { IAdmin } from 'src/modules/admin/interfaces/admin';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: SignUpInput) {
    const userExited = await this.userService.getUserByEmail({
      email: input.email,
    });
    if (!userExited) return await this.userService.signUp(input);
  }

  async signIn(
    input: SignInInput,
  ): Promise<{ id: string; accessToken: string }> {
    const loginValid = await this.userService.login(input);
    console.log('login valid ', loginValid);

    if (loginValid) {
      const payload: IJWTPayload = {
        _id: loginValid._id,
        role: RoleEnum.USER,
        email: loginValid.email,
      };

      const returnPayload = {
        id: payload._id,
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '60m',
          secret: process.env.SECRET_KEY,
        }),
      };

      return returnPayload;
    }
    return null;
  }

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    const passwordValid = await this.userService.comparePassword(
      password,
      user.password,
    );

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async setJWT(): Promise<any> {}

  async getAllUSer() {
    return await this.userService.getAllUser();
  }

  async getUserByEmail(email: string): Promise<IUser | IAdmin> {
    const foundUser = await this.userService.getUserByEmail(email);

    if (!foundUser) return null;
    return foundUser;
  }
}
