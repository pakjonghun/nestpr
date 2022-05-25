import { RedisService } from './../share/redis.service';
import { UserService } from './../user/user.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const redisService = app.get(RedisService);
  const userService = app.get(UserService);

  const user = await userService.find({
    is_amgassador: true,
    relations: ['order', 'order.order_item', 'order.user'],
  });

  const redisClient = redisService.getClient();

  for (let i = 0; i < user.length; i++) {
    await redisClient.zadd('ranking', user[i]['revenue'], user[i]['name']);
  }

  process.exit();
}
bootstrap();
