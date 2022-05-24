import { LoginDto } from './dtos/login.dto';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('이메일이 없습니다.');

    if (!(await compareSync(password, user.password))) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    const token = await this.jwtService.signAsync({ id: user.id });
    return token;

    return user;
  }
}
