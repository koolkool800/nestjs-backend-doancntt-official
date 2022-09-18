import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class BaseUser {
  @Prop()
  @IsNotEmpty()
  email: string;

  @Prop()
  phoneNumber: string;
}

export class SignUpInput extends BaseUser {
  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsNotEmpty()
  displayName: string;
}

export class SignInInput extends BaseUser {
  @Prop()
  password: string;
}
