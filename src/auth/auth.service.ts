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
  }

  async user(jwt: string) {
    const id = await this.jwtService.verifyAsync(jwt);
    if (!id['id']) throw new ForbiddenException('인증실패');
    const user = await this.userService.findById(id['id']);
    if (!user) throw new ForbiddenException('인증실패');
    return user;
  }

  async update(id: number, body: UpdateDto) {
    await this.userService.update(id, body);
    return this.userService.findById(id);
  }

  async updatePassword(id: number, password: string) {
    await this.userService.update(id, { password });
    return this.userService.findById(id);
  }
}
