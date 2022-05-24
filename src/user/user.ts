import { Exclude } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';
import { Link } from 'src/link/link';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail({}, { message: '이메일 형식을 지키세요.' })
  email: string;

  @Column({ select: false })
  @MinLength(3, { message: '비밀번호는 3자리 이상을 입력하세요' })
  password: string;

  @Column()
  @IsString({ message: '이름은 문자열을 입력하세요' })
  first_name: string;

  @Column()
  @IsString({ message: '이름은 문자열을 입력하세요' })
  last_name: string;

  @Column({ default: false })
  @IsBoolean({ message: '관리자인지 아닌지 참 혹은 거짓 입니다.' })
  is_ambassador: boolean;

  @OneToMany(() => Link, (link) => link.user)
  link: Link[];
}
