import { ProductService } from './product.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('admin/product')
  async all() {
    return this.productService.find({});
  }
}
