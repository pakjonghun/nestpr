import { AuthModule } from './../auth/auth.module';
import { ShareModule } from './../share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { Link } from './link';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), ShareModule, AuthModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
