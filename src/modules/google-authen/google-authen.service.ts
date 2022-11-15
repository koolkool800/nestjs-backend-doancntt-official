import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IJWTPayload } from 'src/auth/entities/auth.entity';
import { RoleEnum } from 'src/constants/enum';

@Injectable()
export class GoogleAuthenService {
  constructor(private jwtService: JwtService) {}

  googleLogin(req: Request) {
    if (!req.user) {
      throw new HttpException(
        'Something was wrong! Try again',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { name, emails, photos, id } = (req.user as any).profile;

    // const payload: IJWTPayload & { photo: string; name: string } = {
    //   _id: id,
    //   email: emails[0].value,
    //   role: RoleEnum.USER,
    //   photo: photos[0].value,
    //   name: name,
    // };

    const payload: IJWTPayload = {
      _id: id,
      role: RoleEnum.USER,
      email: emails[0].value,
    };

    return {
      id: payload._id,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '60m',
        secret: process.env.SECRET_KEY,
      }),
    };
  }
}
