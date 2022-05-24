import { PartialType, OmitType } from '@nestjs/mapped-types';
import { User } from 'src/user/user';
export class UpdateDto extends PartialType(
  OmitType(User, ['id', 'password', 'is_ambassador']),
) {}
