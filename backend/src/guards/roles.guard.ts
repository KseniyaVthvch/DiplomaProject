import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/access.decorator';
import { Reflector } from '@nestjs/core';

export enum Role {
  Teacher = 'teacher',
  Student = 'student',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role: string) => role === user.role);
  }
}
