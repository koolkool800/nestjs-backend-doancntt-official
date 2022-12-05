import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entites';
import { TransactionSchema } from './schema/transaction.schema';
// import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/entities/product.enties';
import { ProductSchema } from '../product/schemas/product.schema';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    UserModule,
    ProductModule,
    AdminModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
