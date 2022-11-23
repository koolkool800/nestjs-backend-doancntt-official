import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { PaymentInput } from './dto/stripe.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @UseGuards(AuthenticationGuard)
  @Post('')
  async payAProject(@Body() input: PaymentInput) {
    const { id, price } = input;

    return await this.stripeService.payForProduct(price, id);
  }
}
