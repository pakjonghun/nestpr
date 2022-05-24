import { UpdateProductDto } from './dtos/productUpdate.dto';
import { RegisterProductDto } from './dtos/product.register.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('admin/product')
  async all() {
    return this.productService.find({});
  }

  @Post('admin/product')
  async register(@Body() body: RegisterProductDto) {
    const product = await this.productService.save(body);
    return this.productService.findOne({ id: product['id'] });
  }

  @Get('admin/product/:id')
  async one(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @Put('admin/product/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productService.update(id, body);
    const prodocut = await this.productService.findOne({ id });
    return prodocut;
  }

  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    return { message: 'success' };
  }
}
