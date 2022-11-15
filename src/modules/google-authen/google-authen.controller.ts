import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleAuthenService } from './google-authen.service';

@Controller('google-authentication')
export class GoogleAuthenController {
  constructor(private readonly googleAuthenService: GoogleAuthenService) {}

  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    console.log('authenticating');
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    return this.googleAuthenService.googleLogin(req);
    //everytime login => register without password => if no register, cannot validate with jwt because id user gg doesnt existed
    // if register -> check if that email is exited or not,
    // req.res.setHeader('Set-Cookie', [user.user.accessToken]);
  }
}
