import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('ambassadors')
  async getAmbassadors() {
    this.userService.find({ is_ambassador: true });
  }

  @Get('ambassador/ranking')
  async rank() {
    const user = await this.userService.find({
      is_ambassador: true,
      relations: ['order', 'order.order_item', 'order.user'],
    });

    return user.map((u) => ({
      name: u['name'],
      revenue: u['revenue'],
    }));
  }
}
