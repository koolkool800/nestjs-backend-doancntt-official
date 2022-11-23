import { Module } from '@nestjs/common';
import { GoogleAuthenService } from './google-authen.service';
import { GoogleAuthenController } from './google-authen.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './stragies/google.stragies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [GoogleAuthenController],
  providers: [GoogleAuthenService, GoogleStrategy],
})
export class GoogleAuthenModule {}
