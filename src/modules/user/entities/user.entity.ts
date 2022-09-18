import { Prop } from '@nestjs/mongoose';
import { PermissionEnum, RoleEnum } from 'src/constants/enum';
import { IUser } from '../interfaces/user';

export class User implements IUser {
  @Prop()
  _id: string;

  @Prop()
  displayName?: string;

  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;

  @Prop()
  role?: RoleEnum;

  @Prop()
  permissions?: PermissionEnum;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
