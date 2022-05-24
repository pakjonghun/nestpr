import { ProductService } from './../product/product.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const product = app.get(ProductService);

  for (let i = 0; i < 31; i++) {
    await product.save({
      title: faker.name.jobTitle(),
      desc: faker.name.jobDescriptor(),
      image: faker.image.food(),
      price: Math.random() * 5000 - 1000,
    });
  }

  process.exit();
}
bootstrap();
