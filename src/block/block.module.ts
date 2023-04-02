import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { FileModule } from 'src/file/file.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from './block.model';
import { File } from 'src/file/file.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BlockController],
  providers: [BlockService],
  imports: [
    FileModule,
    SequelizeModule.forFeature([File, Block]),
    AuthModule
  ]
})
export class BlockModule {}
