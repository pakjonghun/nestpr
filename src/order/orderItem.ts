import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsNumber()
  quantity: number;

  @Column()
  @IsNumber()
  admin_revenue: number;

  @Column()
  @IsNumber()
  ambassadsor_revenue: number;

  @ManyToOne(() => Order, (order) => order.order_item)
  order: Order;
}
