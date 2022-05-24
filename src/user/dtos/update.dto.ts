import { PartialType } from '@nestjs/mapped-types';
import { User } from '../user';
export class UpdateBody extends PartialType(User) {}
