import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async save({ password_confirm, ...body }: RegisterDto) {
    const password = await bcrypt.hash(password_confirm, 10);
    return this.userRepo.save({
      ...body,
      password,
      is_ambassador: false,
    });
  }
}
