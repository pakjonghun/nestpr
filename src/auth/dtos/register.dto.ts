import { User } from './../../user/user';
import { OmitType } from '@nestjs/swagger';
import { IsEqualPassword } from '../auth.decorator';

export class RegisterDto extends OmitType(User, ['id'] as const) {
  @IsEqualPassword('password', { message: '비밀번호와 같아야 합니다.' })
  password_confirm: string;
}
