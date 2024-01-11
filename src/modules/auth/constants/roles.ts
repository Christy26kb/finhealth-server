export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ENTITIES {
  USERS = 'users',
  PROFILES = 'profiles',
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
  INVESTMENTS = 'investments',
  SUBSCRIPTIONS = 'subscriptions',
  DEBTS = 'debts',
  LENDS = 'lends',
  REPORTS = 'reports',
  NOTIFIERS = 'notifiers',
  FEEDBACKS = 'feedbacks',
  CATEGORIES = 'categories',
}

export const RolePermissions = {
  [ROLES.USER]: {
    [ENTITIES.USERS]: {
      canCreate: false,
      canRead: true,
      canUpdate: true,
      canDelete: false,
    },
    [ENTITIES.PROFILES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.CATEGORIES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.INCOMES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.EXPENSES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.DEBTS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.LENDS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.INVESTMENTS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.SUBSCRIPTIONS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.NOTIFIERS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.REPORTS]: {
      canCreate: true,
      canRead: true,
      canUpdate: false,
      canDelete: true,
    },
    [ENTITIES.FEEDBACKS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
  },
  [ROLES.ADMIN]: {
    [ENTITIES.USERS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: false,
    },
    [ENTITIES.PROFILES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.CATEGORIES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.INCOMES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.EXPENSES]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.DEBTS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.LENDS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.INVESTMENTS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.SUBSCRIPTIONS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.NOTIFIERS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.REPORTS]: {
      canCreate: false,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    [ENTITIES.FEEDBACKS]: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
  },
};
