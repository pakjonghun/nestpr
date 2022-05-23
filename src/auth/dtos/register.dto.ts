import { User } from './../../user/user';
import { OmitType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { IsEqualPassword } from '../auth.decorator';

export class RegisterDto extends OmitType(User, ['id']) {
  @MinLength(3, { message: '3글자 이상 입니다.' })
  @IsEqualPassword('password', { message: '비밀번호와 같아야 합니다.' })
  password_confirm: string;
}
