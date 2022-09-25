import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
// import { User } from 'src/modules/user/entities/user.entity';
import { UserSchema } from 'src/modules/user/schemas/user.schema';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AdminModule,
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JsonWebTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
