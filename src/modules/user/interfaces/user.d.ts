import { PermissionEnum, RoleEnum } from 'src/constants/enum';

export interface IUser extends IEntity {
  displayName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  address?: string;
  role?: RoleEnum;
  permissions?: PermissionEnum;
}
