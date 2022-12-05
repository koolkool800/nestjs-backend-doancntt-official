import { Prop } from '@nestjs/mongoose';
import { TransactionStatusEnum } from 'src/constants/enum';
import { Product } from 'src/modules/product/entities/product.enties';
import { User } from 'src/modules/user/entities/user.entity';
import { ITransaction } from '../interfaces/transaction';

export class Transaction implements ITransaction {
  @Prop()
  _id: string;

  @Prop()
  products?: Product[];

  @Prop()
  buyer?: User;

  @Prop()
  totalPrice?: number;

  @Prop()
  status?: TransactionStatusEnum;

  @Prop()
  createAt: Date;

  @Prop({ nullable: true })
  updateAt: Date;

  @Prop({ nullable: true })
  keyword: string;

  @Prop({ nullable: true })
  slug: string;
}
