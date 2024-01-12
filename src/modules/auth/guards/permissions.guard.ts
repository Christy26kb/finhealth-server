import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolePermissions } from '../constants/roles';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get('permissions', context.getHandler());

    if (!permissions) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    const isValidRole = user && permissions.role === user.role;
    const isValidAction =
      isValidRole &&
      RolePermissions[user.role][permissions.entity].includes(
        permissions.action,
      );
    return isValidAction;
  }
}
