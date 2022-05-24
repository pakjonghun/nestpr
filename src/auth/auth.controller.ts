import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { Request, Response } from 'express';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
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

  @Get('admin/user')
  async user(@Req() req: Request) {
    const jwt = req.cookies['jwt'];
    return this.authService.user(jwt);
  }
}
