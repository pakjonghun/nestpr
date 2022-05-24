import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('admin/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const jwt = await this.authService.login(body);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success' };
  }

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    return this.userService.save(body);
  }
}
