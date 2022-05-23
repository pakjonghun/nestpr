import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    return this.userService.save(body);
  }
}
