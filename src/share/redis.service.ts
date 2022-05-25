import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  getClient(): RedisClientType {
    const store: any = this.cacheManager.store;
    return store.getClient();
  }
}
