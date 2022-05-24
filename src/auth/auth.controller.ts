import { UpdateDto } from './dtos/update.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    return this.userService.save(body);
  }

  @Post('admin/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginDto,
  ) {
    const jwt = await this.authService.login(body);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success' };
  }

  @UseGuards(AuthGuard)
  @Get('admin/user')
  async user(@Req() req: Request) {
    const jwt = req.cookies['jwt'];
    return this.authService.user(jwt);
  }

  @UseGuards(AuthGuard)
  @Post('admin/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }

  @UseGuards(AuthGuard)
  @Put('admin')
  async update(@Req() req: Request, @Body() body: UpdateDto) {
    const jwt = req.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.authService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Put('admin/password')
  async updatePassword(@Req() req: Request, @Body() body: UpdatePasswordDto) {
    const jwt = req.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.authService.updatePassword(id, body.password);
  }
}
