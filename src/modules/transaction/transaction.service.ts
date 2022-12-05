import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionStatusEnum } from 'src/constants/enum';
import { ProductService } from '../product/product.service';
import { ProductDocument } from '../product/schemas/product.schema';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateTransactionInput } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entites';
import { TransactionDocument } from './schema/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private productService: ProductService,
  ) {}

  async getAllTransactions() {
    try {
      const [transactions, count] = await Promise.all([
        this.transactionModel
          .find()
          .populate([
            {
              path: 'products',
            },
            {
              path: 'buyer',
            },
          ])
          .exec(),
        this.transactionModel.countDocuments(),
      ]);

      const cloneTransaction = [...transactions];

      cloneTransaction.map((trans) => {
        trans.buyer['password'] = undefined;
      });

      return { result: cloneTransaction, count };
    } catch (error) {
      console.log('error', error);
      return { result: [], count: 0 };
    }
  }

  async getAllTransactionsByUser(user: User) {
    try {
      const [transactions, count] = await Promise.all([
        this.transactionModel
          .find({
            buyer: user._id,
          })
          .populate([
            {
              path: 'products',
            },
            {
              path: 'buyer',
            },
          ])
          .exec(),
        this.transactionModel.count({
          buyer: user._id,
        }),
      ]);

      const cloneTransaction = [...transactions];

      cloneTransaction.map((trans) => {
        trans.buyer['password'] = undefined;
      });

      return { result: cloneTransaction, count };
    } catch (error) {
      console.log('error', error);
      return { result: [], count: 0 };
    }
  }

  async createTransaction(input: CreateTransactionInput, user: User) {
    const { products } = input;

    try {
      //find all products
      const foundProducts = await this.productService.getManyProductById(
        products,
      );

      let price = 0;
      foundProducts.map((product) => {
        price = price + this.getPrice(product.price);
      });

      //create transaction
      const transaction = new this.transactionModel({
        products: foundProducts,
        buyer: user,
        totalPrice: price,
        status: TransactionStatusEnum.PENDING,
      });

      if (transaction) return await transaction.save();

      // falsy condition
      throw new BadRequestException(
        'Something wrong! This is message return by Baro gia',
      );
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Error return from trycatch block');
    }
  }

  getPrice(price: string) {
    return Number(price.split(' ').join(''));
  }

  async updateTransaction(transactionId: string) {
    //
    try {
      const transaction = await this.transactionModel.findById(transactionId);

      if (transaction) {
        transaction.status = TransactionStatusEnum.INPROGRESS;

        await transaction.save();

        return true;
      }

      return false;
    } catch (error) {
      console.log('error  :', error);

      throw new BadRequestException('Error return from trycatch');
    }
  }
}
