import { Product } from './product';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/share/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends AbstractService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }
}
