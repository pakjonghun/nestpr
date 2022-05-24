import { AuthGuard } from './../auth/auth.guard';
import { UpdateOrderDto } from './dtos/updateOrderDto';
import { CreateOrderDto } from './dtos/orders.dto';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('admin/order')
  async all() {
    return this.orderService.find({});
  }

  @Get('admin/order/:id')
  async one(@Param('id') id: number) {
    return this.orderService.findOne({ id });
  }

  @Post('admin/order')
  async create(@Body() body: CreateOrderDto) {
    return this.orderService.save(body);
  }

  @UseGuards(AuthGuard)
  @Put('admin/order/:id')
  async update(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    await this.orderService.update(id, { body });
    return this.orderService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('admin/order/:id')
  async delete(@Param('id') id: number) {
    await this.orderService.delete(id);
    return { message: 'success' };
  }
}
