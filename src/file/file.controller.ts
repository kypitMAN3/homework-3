import { Controller, Delete, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

    constructor(private fileService: FileService) {}

    @Delete()
    removeExpiredFiles() {
        return this.fileService.removeExpiredFiles()
    }

    @Get()
    findAll() {
        return this.fileService.getAll()
    }
}
