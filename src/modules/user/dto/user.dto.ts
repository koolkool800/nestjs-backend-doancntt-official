import { Prop } from '@nestjs/mongoose';

export class FilterUser {
  @Prop()
  email?: string;

  @Prop()
  id?: string;
}

export class UpdateUserInput {
  @Prop()
  displayName?: string;

  @Prop()
  email?: string;

  @Prop()
  password: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;
}

export class UpdateUserPassInput {
  password: string;
  newPassword: string;
}
