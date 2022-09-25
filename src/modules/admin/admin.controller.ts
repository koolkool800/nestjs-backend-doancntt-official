import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInInput, SignUpInput } from 'src/auth/dto/auth.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('')
  async createSuperAdmin(
    @Res() response: Response,
    @Body() input: SignUpInput,
  ): Promise<any> {
    const createdAdmin = await this.adminService.signUpSuperAdmin(input);
    if (createdAdmin) {
      return response.status(HttpStatus.OK).json({
        msg: 'Created admin success',
        data: createdAdmin,
      });
    }
    return response.status(HttpStatus.BAD_REQUEST).json({
      msg: 'Created admin failure',
      data: null,
    });
  }

  @Post('/login')
  async loginAdmin(
    @Res() response: Response,
    @Body() input: SignInInput,
  ): Promise<any> {
    const user = await this.adminService.loginAdmin(input);

    if (user) {
      return response.status(HttpStatus.OK).json({
        msg: 'Login success',
        data: user,
      });
    }
    return response.status(HttpStatus.BAD_REQUEST).json({
      msg: 'Login failure',
      data: null,
    });
  }
}
