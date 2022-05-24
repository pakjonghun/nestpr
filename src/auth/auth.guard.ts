import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const jwt = request.cookies['jwt'];

      const { scope } = this.jwtService.verify(jwt);
      console.log('guard', scope);
      const isAdmin = request.path.includes('admin');
      return (
        (isAdmin && scope == 'admin') || (!isAdmin && scope == 'ambassador')
      );
    } catch (error) {
      return false;
    }
  }
}
