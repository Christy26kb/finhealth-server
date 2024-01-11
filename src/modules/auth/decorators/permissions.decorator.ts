import { SetMetadata } from '@nestjs/common';
import { ROLES, ENTITIES } from '../constants/roles';

export const Permissions = (role: ROLES, entity: ENTITIES, actions: string[]) =>
  SetMetadata('permissions', { role, entity, actions });
