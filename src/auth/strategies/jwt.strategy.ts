import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleEnum } from 'src/constants/enum';
import { AdminService } from 'src/modules/admin/admin.service';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { IJWTPayload } from '../entities/auth.entity';
@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    public config: ConfigService,
    private userService: UserService,
    private adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: IJWTPayload): Promise<User | Admin> {
    console.log('validate : ', payload);
    if (payload.role == RoleEnum.USER) {
      const findUser = this.userService.getUserById({ id: payload._id });
      if (findUser) {
        console.log('user in validate : ');
        return await findUser;
      }
      return null;
    }
    if (payload.role == RoleEnum.ADMIN) {
      const findAdmin = this.adminService.getAdminById(payload._id);
      if (findAdmin) {
        console.log('admin in validate jwt strategy : ');
        return await findAdmin;
      }
      return null;
    }
  }
} //
