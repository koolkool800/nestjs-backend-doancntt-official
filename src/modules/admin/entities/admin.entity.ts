import { Prop } from '@nestjs/mongoose';
import { AdminPermissionEnum, RoleEnum } from 'src/constants/enum';
import { IAdmin } from '../interfaces/admin';

export class Admin implements IAdmin {
  @Prop()
  _id: string;

  @Prop()
  displayName?: string;

  @Prop()
  email?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  password?: string;

  @Prop()
  role?: RoleEnum;

  @Prop()
  permissions?: AdminPermissionEnum;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
