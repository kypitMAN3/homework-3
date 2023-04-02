import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';
import { User } from 'src/users/users.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([Token, User]),
    JwtModule,
    forwardRef(() => UsersModule)
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
