import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Block } from './block.model';
import { CreateBlockDto } from './dto/create-block.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class BlockService {

    constructor(@InjectModel(Block) private blockRepository: typeof Block,
                                    private fileService: FileService) {}

    async createBlock(dto: CreateBlockDto, image) {
        const block = await this.blockRepository.create(dto)
        if (image) {await this.uploadImage(block.id, image)}
        
        return {
            block,
            image
        }
    }

    async getAll() {
        return this.blockRepository.findAll()
    }

    async getGroup(group: string) {
        return this.blockRepository.findAll({where: {blockGroup: group}})
    }

    async updateBlock(dto, id) {
        const block = await this.blockRepository.findByPk(id)
        if(block) {
            await block.update(dto)
            return block
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }

    async removeBlock(id: number) {
        const block = await this.blockRepository.findByPk(id)

        if(block) {
            await block.destroy()
            const image = await this.fileService.getFileUsage(id)
            await this.fileService.unlinkFile(image.id)
            return true
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }

    async uploadImage(id, image) {
        const payload = {essenceTable: 'block', essenceId: id}
        return this.fileService.createFile(payload, image)
    }

    async unlinkImage(id) {
        return await this.fileService.unlinkFile(id)
    }
}
