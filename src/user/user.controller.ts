import { RedisService } from './../share/redis.service';
import { UserService } from './user.service';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Get('ambassadors')
  async getAmbassadors() {
    this.userService.find({ is_ambassador: true });
  }

  @Get('ambassador/ranking')
  async rank(@Res() res: Response) {
    const client = this.redisService.getClient();
    client.ZREVRANGEBYSCORE(
      'ranking',
      '+inf',
      '-inf',
      'withscores',
      (err, result) => {
        res.send(result);
      },
    );
  }
}
