import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userRepo: UserService) {}

  @Get('ambassadors')
  async getAmbassadors() {
    return this.userRepo.find();
  }
}
