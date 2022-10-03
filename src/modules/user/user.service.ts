import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { FilterUser } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const user = new this.userModel(signUpInput);
    const salt = await bcrypt.genSalt();
    const password = signUpInput.password;
    const hashPass = await bcrypt.hash(password, salt);

    user.password = hashPass;

    await user.save();

    return user;
  }

  async comparePassword(
    password: string,
    hashedPass: string,
  ): Promise<boolean> {
    const compare = await bcrypt.compare(password, hashedPass);
    if (compare) return true;
    return false;
  }

  async getUserByEmail(email): Promise<User | undefined> {
    return this.userModel.findOne(email);
  }

  async getUserById(filter: FilterUser): Promise<User> {
    return this.userModel.findById(filter.id);
  }

  async getAllUser(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async login(loginInput: SignInInput): Promise<User> {
    const { email, password } = loginInput;

    const user = await this.getUserByEmail({ email: email });
    const hashedPass = user.password;

    const comparePass = await this.comparePassword(password, hashedPass);
    if (user) {
      if (comparePass) {
        return user;
      }
    }
  }
}
