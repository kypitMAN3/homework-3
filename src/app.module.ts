import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { Profile } from './profile/profile.model';
import { Token } from './auth/token.model';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { File } from './file/file.model';
import { BlockModule } from './block/block.module';
import { FileUsage } from './file/fileUsage.model';
import { Block } from './block/block.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'homework3',
      models: [User, Role, UserRoles, Profile, Token, File, FileUsage, Block],
      autoLoadModels: true                  // автоматическое создание таблиц в бд
    }),
    UsersModule,
    ProfileModule,
    RolesModule,
    AuthModule,
    FileModule,
    BlockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
