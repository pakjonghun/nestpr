import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest() as Response;
      const jwt = request['jwt'];
      return this.jwtService.verify(jwt);
    } catch (error) {
      return false;
    }
  }
}
