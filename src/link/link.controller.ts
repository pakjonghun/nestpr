import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from './../auth/auth.guard';
import { LinkService } from './link.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('admin/user/:id/link')
  async(@Param('id') id: number) {
    return this.linkService.find({ user: { id } });
  }

  @UseGuards(AuthGuard)
  @Post('ambassador/link')
  async create(@Req() req: Request, @Body('products') products: number[]) {
    const jwt = req.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(jwt);
    const user = await this.authService.user(id);
    const link = await this.linkService.save({
      code: Math.random().toString(36).slice(6),
      user,
      product: products.map((p) => ({
        id: p['id'],
      })),
    });

    return this.linkService.findOne({ id: link['id'] });
  }
}
