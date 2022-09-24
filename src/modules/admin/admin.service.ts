import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';
import { Admin } from './entities/admin.entity';
import { AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private userService: UserService,
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

  async loginAdmin(input: SignInInput): Promise<Admin> {
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
}
