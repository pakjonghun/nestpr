import { IsString } from 'class-validator';
import { Product } from './../product/product';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString({ message: '코드는 문자 입니다.' })
  code: string;

  @ManyToOne(() => User, (user) => user.link)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_link',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'link_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
