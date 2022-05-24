import { RegisterProductDto } from './dtos/product.register.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  async one(@Param() id: number) {
    return this.productService.findOne({ id });
  }
}
