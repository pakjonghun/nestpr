import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dtos/register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateBody } from './dtos/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async save({ password_confirm, ...body }: RegisterDto) {
    const isExist = await this.userRepo.count({ email: body.email });
    if (isExist) throw new BadRequestException('이미 존재하는 이메일 입니다.');

    const password = await bcrypt.hash(password_confirm, 10);
    return this.userRepo.save({
      ...body,
      password,
    });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ email });
  }

  async findById(id: number) {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, body: UpdateBody) {
    await this.userRepo.save({ id, ...body });
  }

  async find() {
    const users = await this.userRepo.find({ is_ambassador: true });
    console.log(users);
    return users;
  }
}
