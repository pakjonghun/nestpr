import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';

@Injectable()
export class Listeners {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @OnEvent('product.create')
  async handleProductCreate() {
    await this.cache.del('backend_product');
    await this.cache.del('frontend_product');
  }
}
