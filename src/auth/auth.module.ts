import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareModule } from './../share/share.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/user';

@Module({
  imports: [UserModule, ShareModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
