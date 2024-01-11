import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get('permissions', context.getHandler());

    if (!permissions) {
      return true; // No permissions defined, allow access
    }

    // Implement your logic to check user permissions based on the metadata

    // For example, check if the user's role allows the specified actions
    const user = context.switchToHttp().getRequest().user;
    if (user && permissions.role === user.role) {
      // Additional checks based on user's role, entity, and actions
      // ...

      return true; // Access granted
    }

    return false; // Access denied
  }
}
