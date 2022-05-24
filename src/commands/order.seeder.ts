import { OrderItemService } from './../order/orderItem.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { OrderService } from '../order/order.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const order = app.get(OrderService);
  const orderItem = app.get(OrderItemService);

  for (let i = 0; i < 31; i++) {
    const or = await order.save({
      user_id: randomInt(44, 100),
      code: faker.lorem.slug(2),
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      adress: faker.address.city(),
      country: faker.address.country(),
      zip: faker.address.zipCode(),
      completed: true,
      user: { id: 122 },
    });

    for (let j = 0; j < randomInt(2, 5); j++) {
      await orderItem.save({
        title: faker.lorem.slug(1),
        price: randomInt(100, 1000),
        quantity: randomInt(1, 100),
        admin_revenue: randomInt(1, 100),
        ambassadsor_revenue: randomInt(1, 100),
        order: or,
      });
    }
  }

  process.exit();
}
bootstrap();
