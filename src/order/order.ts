import { Link } from './../link/link';
import { User } from '../user/user';
import { OrderItem } from './orderItem';
import { IsBoolean, IsEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  transiction_id: number;

  @Column()
  user_id: number;

  @Column()
  @IsString({ message: '코드는 문자열이어야 합니다.' })
  code: string;

  @Column()
  @IsEmpty({ message: '이메일 형식을 지켜야 합니다.' })
  email: string;

  @Exclude()
  @Column()
  @IsString({ message: '이름은 문자열입니다.' })
  first_name: string;

  @Exclude()
  @Column()
  @IsString({ message: '이름은 문자열 입니다.' })
  last_name: string;

  @Column({ nullable: true })
  @IsString({ message: '주소는 문자열 입니다.' })
  adress: string;

  @Column({ nullable: true })
  @IsString({ message: '국가는 문자열 입니다.' })
  country: string;

  @Column({ nullable: true })
  @IsString({ message: 'Zip 은 문자열 이어야 합니다.' })
  zip: string;

  @Exclude()
  @Column({ default: false })
  @IsBoolean({ message: 'completed 는 블리언 입니다.' })
  completed: boolean;

  @OneToMany(() => OrderItem, (item) => item.order)
  @JoinColumn({ name: 'order_id' })
  order_item: OrderItem[];

  @ManyToOne(() => User, (user) => user.order, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => Link, (link) => link.order, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    referencedColumnName: 'code',
    name: 'code',
  })
  link: Link;

  @Expose()
  get name() {
    return this.first_name + ' ' + this.last_name;
  }

  @Expose()
  get total() {
    return this.order_item.reduce((acc, cur) => cur.price + acc, 0);
  }

  @Expose()
  get revenue() {
    const isAdmin = !this.user.is_ambassador;
    const isCompleted = this.completed;
    if (!isCompleted) return 0;
    else
      return isAdmin
        ? this.order_item.reduce((acc, cur) => cur.admin_revenue + acc, 0)
        : this.order_item.reduce(
            (acc, cur) => cur.ambassadsor_revenue + acc,
            0,
          );
  }
}
