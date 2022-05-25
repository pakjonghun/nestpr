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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { title } from 'process';

@Controller()
export class ProductController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly productService: ProductService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  @Get('admin/product')
  async all() {
    return this.productService.find({});
  }

  @Post('admin/product')
  async register(@Body() body: RegisterProductDto) {
    const product = await this.productService.save(body);
    const p = await this.productService.findOne({ id: product['id'] });
    this.eventEmmiter.emit('product.create');
    return p;
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
    this.eventEmmiter.emit('product.create');
    return prodocut;
  }

  @UseGuards(AuthGuard)
  @Delete('admin/product/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    this.eventEmmiter.emit('product.create');
    return { message: 'success' };
  }

  @CacheKey('frontend_product')
  @CacheTTL(30 * 60)
  @UseInterceptors(CacheInterceptor)
  @Get('ambassador/product/frontend')
  async frontend() {
    return this.productService.find();
  }

  @Get('ambassador/product/backend')
  async backend(@Query() query: string) {
    let value = (await this.cacheManager.get('backend_product')) as any[];
    if (!value) {
      value = await this.productService.find();
      this.cacheManager.set('backend_product', value, { ttl: 30 * 60 });
    }

    if (Object.keys(query).length) {
      Object.keys(query).forEach((key) => {
        const qu = query[key].toLowerCase();
        console.log(qu, key);
        value = value.filter((v) => {
          return v[key].toLowerCase().includes(qu);
        });
      });
    }

    return value;
  }
}
