import { Order } from './../order';
import { OmitType } from '@nestjs/swagger';
export class CreateOrderDto extends OmitType(Order, ['id']) {}
