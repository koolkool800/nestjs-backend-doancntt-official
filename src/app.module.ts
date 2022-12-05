import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { RolesGuard } from './common/guards/roles.guard';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigurationService } from './configuration/configuration/configuration.service';
import { GoogleAuthenModule } from './modules/google-authen/google-authen.module';
import { StripeModule } from './stripe/stripe.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://baovavan:doancntt@cluster0.eckkd7e.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    PassportModule,
    AdminModule,
    CategoryModule,
    ProductModule,
    GoogleAuthenModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [ConfigurationService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = this.configurationService.port as number;
  }
}
