import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product';
import { ShareModule } from '../share/share.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ShareModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
