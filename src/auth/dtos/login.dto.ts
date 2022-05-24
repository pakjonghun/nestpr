import { User } from './../../user/user';
import { PickType } from '@nestjs/swagger';

export class LoginDto extends PickType(User, ['email', 'password']) {}
