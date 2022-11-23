import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async payForProduct(price: number, id: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount: price,
        currency: 'USD',
        payment_method: id,
        confirm: true,
      });
    } catch (error) {
      throw new HttpException(
        'This payment is not success',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
