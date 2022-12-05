import { TransactionStatusEnum } from 'src/constants/enum';
import { Product } from 'src/modules/product/entities/product.enties';
import { User } from 'src/modules/user/entities/user.entity';

export interface ITransaction extends IEntity {
  products?: Product[];
  buyer?: User;
  status?: TransactionStatusEnum;
  totalPrice?: number;
}
