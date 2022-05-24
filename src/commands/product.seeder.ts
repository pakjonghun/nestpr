import { ProductService } from './../product/product.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const product = app.get(ProductService);

  for (let i = 0; i < 31; i++) {
    await product.save({
      title: faker.lorem.word(),
      desc: faker.lorem.paragraph(),
      image: faker.image.imageUrl(300, 300, '', true), //이래야 매번 고유 랜덤 이미지 나옴
      price: Math.random() * 5000 - 1000,
    });
  }

  process.exit();
}
bootstrap();
