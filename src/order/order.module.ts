import { ShareModule } from './../share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order';
import { OrderItem } from './orderItem';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ShareModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
