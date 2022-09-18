import { Prop } from '@nestjs/mongoose';

export class FilterUser {
  @Prop()
  email?: string;

  @Prop()
  id?: string;
}
