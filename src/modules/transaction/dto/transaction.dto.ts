import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Transaction } from '../entities/transaction.entites';

export class CreateTransactionInput {
  @Prop()
  @IsNotEmpty()
  products: string[];
}

export class updateTransactionInput {
  @Prop()
  @IsNotEmpty()
  transactionId: string;
}
