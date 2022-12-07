import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleEnum } from 'src/constants/enum';
import { User } from '../user/entities/user.entity';
import {
  CreateTransactionInput,
  updateTransactionInput,
} from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get('admin')
  async getAllTransactions() {
    return await this.transactionService.getAllTransactions();
  }

  @UseGuards(AuthenticationGuard)
  @Get('')
  async getAllTransactionByUser(@CurrentUser() user: User) {
    return await this.transactionService.getAllTransactionsByUser(user);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put('admin')
  async updateTransaction(@Body() input: updateTransactionInput) {
    const { transactionId } = input;

    return await this.transactionService.updateTransaction(transactionId);
  }

  @UseGuards(AuthenticationGuard)
  @Post('create')
  async createTransaction(
    @Body() input: CreateTransactionInput,
    @CurrentUser() user: User,
  ) {
    return await this.transactionService.createTransaction(input, user);
  }
}
