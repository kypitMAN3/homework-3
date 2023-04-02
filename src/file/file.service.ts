import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import { InjectModel } from '@nestjs/sequelize';
import { File } from './file.model';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {

    constructor(@InjectModel(File) private fileRepository: typeof File) {}

    async createFile(dto: CreateFileDto, file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            await this.fileRepository.create({
                essenceTable: dto.essenceTable, 
                essenceId: dto.essenceId, 
                filePath: path.join(filePath, fileName)
            })

            return fileName
        } catch(e) {
            console.log(e)
            throw new HttpException('Error writing file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getFile(value) {
        return await this.fileRepository.findOne({where: {value}})
    }

    async getFileUsage(essenceId) {
        return await this.fileRepository.findOne({where: {essenceId: essenceId}})
    }

    async getAll() {
        return await this.fileRepository.findAll()
    }

    async update(dto: CreateFileDto, fileId: number) {
        const file = await this.fileRepository.findByPk(fileId)

        if(file) {
            await file.update(dto)
            return file
        }

        throw new HttpException('File not found', HttpStatus.NOT_FOUND)
    }

    async remove(fileId) {
        const file = await this.fileRepository.findByPk(fileId)

        if(file) {
            await file.destroy()
            await fs.unlink(file.filePath, () => {
                console.log('File was deleted')
            })
            return true
        }

        throw new HttpException('File not found', HttpStatus.NOT_FOUND)
    }

    async removeExpiredFiles() {
        const files = await this.getAll()
        const now = Number(new Date)
        const expiredFiles = files.filter(file => now - file.updatedAt >= 3.6)      // Найти все файлы обновленные больше, чем час назад
        expiredFiles.map(file => this.remove(file.id))

        return true
    }

    async unlinkFile(id) {
        const file = await this.fileRepository.findByPk(id)

        file.set({
            essenceTable: null,
            essenceId: null,
            updatedAt: new Date()
        }).save()

        return file
    }

}
