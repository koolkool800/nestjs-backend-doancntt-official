import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Put,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { AuthenticationGuard } from '../common/guards/auth.guard';
import { LocalAuthGuard } from '../common/guards/local.guard';
import { User } from 'src/modules/user/entities/user.entity';
import {
  UpdateUserInput,
  UpdateUserPassInput,
} from 'src/modules/user/dto/user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/signIn')
  async login(@Res() response: Response, @Body() input: SignInInput) {
    const login = await this.authService.signIn(input);
    if (login)
      return response
        .status(HttpStatus.OK)
        .json({ id: login.id, accessToken: login.accessToken });
    return response
      .status(HttpStatus.UNAUTHORIZED)
      .json({ msg: 'User || password wrong or this account does not exit' });
  }

  @Post('/signUp')
  async register(@Res() response: Response, @Body() input: SignUpInput) {
    const newUser = await this.authService.signUp(input);
    if (newUser) return response.status(HttpStatus.CREATED).json({ newUser });
    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ msg: 'User already existed' });
  }

  @UseGuards(AuthenticationGuard)
  @Get('/users')
  async getAllUser() {
    return await this.authService.getAllUSer();
  }

  @Get('/email/:email')
  async getUserByEmail(
    @Param('email') email: string,
    @Res() response: Response,
  ) {
    const user = await this.authService.getUserByEmail(email);

    if (user) {
      return response.status(HttpStatus.OK).json({
        user: <User>{
          email: user.email,
          _id: user._id,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          role: user.role,
          permissions: user.permissions,
          address: user.address,
        },
      });
    }
    return response.status(HttpStatus.BAD_REQUEST).json({
      user: null,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('update-user')
  async updateUser(
    @Res() response: Response,
    @Body() input: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    const updatedUser = await this.authService.updateUser(input, user);

    if (!updatedUser)
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Updated failure',
        status: HttpStatus.BAD_REQUEST,
      });
    return response.status(HttpStatus.OK).json({
      message: 'Updated success',
      status: HttpStatus.OK,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Put('update-password')
  async updatePassword(
    @Body() input: UpdateUserPassInput,
    @CurrentUser() user: User,
  ) {
    const updatePass = await this.authService.updatePassword(
      user,
      input.password,
      input.newPassword,
    );
    return updatePass;
  }
}
