import { AuthGuard } from './../auth/auth.guard';
import { UpdateProductDto } from './dtos/productUpdate.dto';
import { RegisterProductDto } from './dtos/product.register.dto';
import { ProductService } from './product.service';
import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller()
export class ProductController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly productService: ProductService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Put('admin/product/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productService.update(id, body);
    const prodocut = await this.productService.findOne({ id });
    return prodocut;
  }

  @UseGuards(AuthGuard)
  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    return { message: 'success' };
  }

  @CacheKey('frontend_product1')
  @CacheTTL(30 * 60)
  @UseInterceptors(CacheInterceptor)
  @Get('ambassador/product/frontend')
  async frontend() {
    return this.productService.find();
  }

  @Get('ambassador/product/backend')
  async backend() {
    let value = await this.cacheManager.get('backend_product');
    if (!value) {
      value = await this.productService.find();
      this.cacheManager.set('backend_product', value, { ttl: 30 * 60 });
    }

    return value;
  }
}
