import { OmitType } from '@nestjs/mapped-types';
import { Product } from './../product';
export class RegisterProductDto extends OmitType(Product, ['id']) {}
