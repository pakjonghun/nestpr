import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  const password = await bcrypt.hashSync('123', 10);

  for (let i = 0; i < 31; i++) {
    await userService.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password,
      password_confirm: password,
      email: faker.internet.email(),
      is_ambassador: true,
    });
  }

  process.exit();
}
bootstrap();
