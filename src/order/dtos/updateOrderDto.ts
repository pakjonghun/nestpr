import { CreateOrderDto } from './orders.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
