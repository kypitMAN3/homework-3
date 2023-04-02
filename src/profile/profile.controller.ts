import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {}

    @Post()
    registration(@Body() dto: RegistrationDto) {
        return this.profileService.registration(dto)
    }

    @Get(':id')
    getProfile(@Param('id') id: number) {
        return this.profileService.findProfileById(id)
    }

    @UseGuards(RolesGuard, UserIsUserGuard)
    @Roles('ADMIN')
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateProfileDto) {
        return this.profileService.update(dto, id)
    }

    @UseGuards(RolesGuard, UserIsUserGuard)
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.profileService.remove(id)
    }

    @Post('/image/:id')
    @UseInterceptors(FileInterceptor('image'))
    addImage(@Param('id') id: number, @UploadedFile() image: Express.Multer.File) {
        return this.profileService.uploadImage(id, image)
    }

    @Delete('/image/:id')
    removeImage(@Param('id') id: number) {
        return this.profileService.unlinkImage(id)
    }

}
