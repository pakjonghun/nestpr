import { RegisterDto } from '../dtos/register.dto';
import { PickType } from '@nestjs/swagger';
export class UpdatePasswordDto extends PickType(RegisterDto, [
  'password',
  'password_confirm',
]) {}
