import { ShareModule } from './../share/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { Link } from './link';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), ShareModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
