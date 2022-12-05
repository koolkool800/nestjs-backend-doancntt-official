export enum StatusEnum {
  FULL = 'FULL',
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum AdminPermissionEnum {
  FULL = 'FULL',
  SEE_ONLY = 'SEE_ONLY',
  EDIT = 'EDIT',
}

export enum PermissionEnum {
  FULL = 'FULL',
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum TransactionStatusEnum {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
}
