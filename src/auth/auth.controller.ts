import { UpdateDto } from './dtos/update.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcryptjs';
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

  @Post(['admin/register', 'ambassador/register'])
  async register(@Req() req: Request, @Body() body: RegisterDto) {
    const isAmbissador = req.path === '/api/ambassador/register';
    const hashedPassword = await bcrypt.hashSync(body.password, 10);
    return this.userService.save({
      ...body,
      password: hashedPassword,
      is_ambassador: isAmbissador,
    });
  }

  @Post(['admin/login', 'ambassador/login'])
  async login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() body: LoginDto,
  ) {
    const jwt = await this.authService.login(req.path, body);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get(['admin/user', 'ambassador/user'])
  async user(@Req() req: Request) {
    const jwt = req.cookies['jwt'];
    const a = await this.jwtService.verifyAsync(jwt);

    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.authService.user(id);
  }

  @UseGuards(AuthGuard)
  @Post(['admin/logout', 'ambassador/logout'])
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }

  @UseGuards(AuthGuard)
  @Put(['admin', 'ambassador'])
  async update(@Req() req: Request, @Body() body: UpdateDto) {
    const jwt = req.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.authService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Put(['admin/password', 'ambassador/password'])
  async updatePassword(@Req() req: Request, @Body() body: UpdatePasswordDto) {
    const jwt = req.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(jwt);
    return this.authService.updatePassword(id, body.password);
  }
}
