import { RegisterProductDto } from './product.register.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateProductDto extends PartialType(RegisterProductDto) {}
