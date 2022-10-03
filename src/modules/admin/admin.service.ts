import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';
import { Admin } from './entities/admin.entity';
import { AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { IJWTPayload } from 'src/auth/entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUpSuperAdmin(input: SignUpInput): Promise<Admin> {
    const newAdmin = new this.adminModel(input);
    if (newAdmin) {
      newAdmin.role = RoleEnum.ADMIN;
      newAdmin.permissions = AdminPermissionEnum.FULL;
      //hash
      const salt = await bcrypt.genSalt();
      const password = newAdmin.password;
      const hashedPassword = await bcrypt.hash(password, salt);
      newAdmin.password = hashedPassword;
    }
    return await newAdmin.save();
  }

  //this function not for login, just for checking that is user correct or not
  async validateAdmin(input: SignInInput): Promise<Admin> {
    console.log('input at validate admin ', input);

    const foundAdmin = await this.adminModel.findOne({ email: input.email });
    const { password } = input;
    const hashedPassword = foundAdmin.password;
    if (foundAdmin) {
      const comparePass = await this.userService.comparePassword(
        password,
        hashedPassword,
      );
      if (comparePass) return foundAdmin;
    }
    return null;
  }

  //function used to login in controller
  async loginAdmin(
    input: SignInInput,
  ): Promise<{ id: string; accessToken: string }> {
    const loginValid = await this.validateAdmin(input);
    console.log('login valid ', loginValid);

    if (loginValid) {
      const payload: IJWTPayload = {
        _id: loginValid._id,
        role: RoleEnum.ADMIN,
        email: loginValid.email,
      };

      console.log('payload : ', payload);

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

  async getAdminById(id: string): Promise<Admin> {
    return await this.adminModel.findById(id);
  }
}
