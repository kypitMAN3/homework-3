import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Profile } from './profile.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { File } from 'src/file/file.model';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([User, Profile, File]),
    AuthModule,
    UsersModule,
    FileModule
  ],
})
export class ProfileModule {}
