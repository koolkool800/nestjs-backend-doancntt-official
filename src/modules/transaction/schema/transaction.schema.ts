import { Schema } from 'mongoose';
import { TransactionStatusEnum } from 'src/constants/enum';
import { Product } from 'src/modules/product/entities/product.enties';
import { User } from 'src/modules/user/entities/user.entity';
import { Transaction } from '../entities/transaction.entites';

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = new Schema<Transaction>({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: Product.name,
    },
  ],
  buyer: {
    type: Schema.Types.ObjectId,
    ref: User.name,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatusEnum),
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
  },
  keyword: {
    type: String,
  },
  updateAt: {
    type: Date,
  },
});
