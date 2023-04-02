import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './file.model';
import { Profile } from 'src/profile/profile.model';
import { Block } from 'src/block/block.model';
import { FileController } from './file.controller';

@Module({
  providers: [FileService],
  exports: [FileService],
  imports: [
    SequelizeModule.forFeature([File, Profile, Block])
  ],
  controllers: [FileController]
})
export class FileModule {}
