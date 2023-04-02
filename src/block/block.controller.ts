import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlockService } from './block.service';
import { group } from 'console';
import { CreateBlockDto } from './dto/create-block.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';

@UseGuards(RolesGuard)
@Controller('block')
export class BlockController {

    constructor (private blockService: BlockService) {}

    @Roles('ADMIN')
    @Get()
    getAll() {
        return this.blockService.getAll()
    }

    @Roles('ADMIN')
    @Get('/:group')
    getGroup(@Param('group') group: string) {
        return this.blockService.getGroup(group)
    }

    @Roles('ADMIN')
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateBlockDto, @UploadedFile('image') image: Express.Multer.File) {
        return this.blockService.createBlock(dto, image)
    }

    @Roles('ADMIN')
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: number, @UploadedFile('image') image: Express.Multer.File, @Body() dto: CreateBlockDto) {
        return this.blockService.updateBlock(dto, id)
    }

    @Roles('ADMIN')
    @Post('/image/:id')
    @UseInterceptors(FileInterceptor('image'))
    addImage(@Param('id') id: number, @UploadedFile() image: Express.Multer.File) {
        return this.blockService.uploadImage(id, image)
    }

    @Roles('ADMIN')
    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.blockService.removeBlock(id)
    }
    
}
