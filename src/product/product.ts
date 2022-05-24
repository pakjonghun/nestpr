import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: '제목은 문자열 입니다.' })
  title: string;

  @Column()
  @IsString({ message: '설명은 문자열 입니다.' })
  desc: string;

  @Column()
  @IsString({ message: '이미지는 문자열 입니다.' })
  image: string;

  @Column()
  @IsNumber({}, { message: '가격은 숫자 입니다.' })
  price: number;
}
