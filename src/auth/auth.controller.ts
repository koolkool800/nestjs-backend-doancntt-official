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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { AuthenticationGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

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
  @Get('')
  async getAllUser() {
    return await this.authService.getAllUSer();
  }
}
