import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('ambassadors')
  async getAmbassadors() {
    this.userService.find({ is_ambassador: true });
  }
}
