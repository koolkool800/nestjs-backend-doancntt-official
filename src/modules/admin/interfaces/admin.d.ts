import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';

export interface IAdmin extends IEntity {
  displayName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  role?: RoleEnum;
  permissions?: AdminPermissionEnum;
}
