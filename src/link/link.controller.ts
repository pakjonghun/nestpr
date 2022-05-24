import { LinkService } from './link.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('admin/user/:id/link')
  async(@Param('id') id: number) {
    return this.linkService.find({ user: { id } });
  }
}
