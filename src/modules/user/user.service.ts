import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { FilterUser, UpdateUserInput } from './dto/user.dto';

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

  async hashPassByBcrypt(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    return hashPass;
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

  async updateUser(input: UpdateUserInput, requestUser: User) {
    const user = await this.getUserByEmail({ email: requestUser.email });

    const { password, ...props } = input;
    let comparePass;
    if (password)
      comparePass = await this.comparePassword(password, user.password);

    if (user) {
      if (input.password && comparePass) {
        const updatedUser = this.userModel.findByIdAndUpdate(
          requestUser._id,
          props,
        );
        return updatedUser;
      } else if (password && !comparePass) {
        throw new HttpException(
          'Your current password is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return null;
  }

  async updatePassword(
    requestUser: User,
    currentPass: string,
    newPass: string,
  ) {
    //
    const foundUser = await this.getUserByEmail({ email: requestUser.email });
    const comparePass = await this.comparePassword(
      currentPass,
      foundUser.password,
    );

    if (foundUser) {
      if (comparePass) {
        const newHashedPass = await this.hashPassByBcrypt(newPass);
        const user = await this.userModel.findById(requestUser._id);
        user.password = newHashedPass;

        return await user.save();
      }
      throw new HttpException(
        'Your password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Something wrong, try again',
      HttpStatus.BAD_REQUEST,
    );
  }
}
