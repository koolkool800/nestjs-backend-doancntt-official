import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { RoleEnum } from 'src/constants/enum';
import { User } from 'src/modules/user/entities/user.entity';

export class IJWTPayload {
  @Prop()
  @IsNotEmpty()
  _id: string;

  @Prop()
  @IsNotEmpty()
  role: RoleEnum;

  @Prop()
  @IsNotEmpty()
  email: string;
}

export class JWTPayload {
  @Prop()
  accessToken?: string;
  @Prop()
  refreshToken?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userInfo?: User;

  @Prop()
  payload?: IJWTPayload; // edit the data type of payload into IJWTPayload
}
