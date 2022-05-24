import { UserService } from './user.service';
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userRepo: UserService) {}

  @Get('ambassadors')
  async getAmbassadors() {
    return this.userRepo.find();
  }
}
