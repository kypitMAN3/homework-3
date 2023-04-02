import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { Profile } from 'src/profile/profile.model';
import { Token } from 'src/auth/token.model';
import { AuthModule } from 'src/auth/auth.module';
import { File } from 'src/file/file.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile, Token, File]),
    RolesModule,                                                    // Нужен RoleService из RoleModule, поэтому импортируем МОДУЛь
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
