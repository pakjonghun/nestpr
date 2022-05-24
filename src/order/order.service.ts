import { Order } from './order';
import { AbstractService } from '../share/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {
    super(orderRepo);
  }
}
