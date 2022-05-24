import { OrderItem } from './../order/orderItem';
import { Order } from './../order/order';
import { UpdateDto } from './dtos/update.dto';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async login(path: string, { email, password }: LoginDto) {
    const user = await this.userService.findUserWithPassword({ email });
    if (!user) throw new NotFoundException('이메일이 없습니다.');

    if (!(await compareSync(password, user.password))) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    if (user.is_ambassador && path.includes('admin')) {
      throw new ForbiddenException('unauth');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      scope: path == '/api/admin/login' ? 'admin' : 'ambassador',
    });
    return token;
  }

  async user(id: number) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id=:id', { id })
      .leftJoinAndSelect('user.order', 'order')
      .leftJoinAndSelect('order.order_item', 'order_item')
      .getOne();

    if (!user) throw new ForbiddenException('인증실패');
    return user;
  }

  async update(id: number, body: UpdateDto) {
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  async updatePassword(id: number, password: string) {
    await this.userService.update(id, { password });
    return this.userService.findOne({ id });
  }
}
