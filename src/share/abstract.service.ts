import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repo: Repository<any>) {}

  async save(options) {
    return this.repo.save(options);
  }

  async findOne(options) {
    return this.repo.findOne(options);
  }

  async find(options) {
    return this.repo.find(options);
  }

  async update(id: number, options) {
    await this.repo.save({ id, ...options });
  }
}
