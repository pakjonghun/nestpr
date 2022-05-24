import { Link } from '../link/link';
import { AbstractService } from '../share/abstract.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService extends AbstractService {
  constructor(
    @InjectRepository(Link) private readonly linkRepo: Repository<Link>,
  ) {
    super(linkRepo);
  }
}
