import { ShareModule } from './../share/share.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, ShareModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
