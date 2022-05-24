import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PickType } from '@nestjs/swagger';
export class UpdatePasswordDto extends PickType(RegisterDto, [
  'password',
  'password_confirm',
]) {}
