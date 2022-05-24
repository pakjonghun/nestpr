import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AbstractService } from '../share/abstract.service';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findUserWithPassword(options) {
    return this.userRepository.findOne(
      { ...options },
      { select: ['id', 'password', 'is_ambassador'] },
    );
  }
}
