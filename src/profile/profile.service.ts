import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { RegistrationDto } from './dto/registration.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthService } from 'src/auth/auth.service';
import { FileService } from 'src/file/file.service';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private userService: UsersService,
                private authService: AuthService,
                private fileService: FileService
                ) {}

    async registration(dto: RegistrationDto) {                                                              // дто, совмещающий инфу от юзера и профиля, т.к. не знаю как параллельно передавать две дто
        const candidate = await this.userService.getUserByEmail(dto.email)

        if (candidate) {
            throw new HttpException('User with this email is already registered', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(dto.password, 5)                                             // хэшируем пароль
        const user = await this.userService.createUser({email: dto.email, password: hashPassword})          // создаем юзера, перезаписывая пароль на хэш
        await this.createProfile({fullName: dto.fullName, phoneNumber: dto.phoneNumber, userId: user.id})   // создаем профиль
        
        const tokens = this.authService.generateTokens(user)          // генерируем токены с данными из юзера
        await this.authService.saveToken(user.id, tokens.refreshToken)         // сохраняем токены в бд

        return {...tokens, user}
    }

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto)
        return profile
    }

    async update(dto: CreateProfileDto, id: number) {
        const profile = await this.findProfileById(id)

        if(profile) {
            await profile.update({...dto, userId: profile.userId})
            return profile
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }

    async remove(id: number) {
        const profile = await this.findProfileById(id)

        if(profile) {
            await profile.destroy()
            const image = await this.fileService.getFile({essenceId: profile.id})
            await this.fileService.unlinkFile(image.id)
            return true
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }

    async findProfileById(id: number) {
        const  profile = await this.profileRepository.findByPk(id)

        if (profile) {
            return profile
        }

        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
    }

    async uploadImage(id, image) {
        const payload = {essenceTable: 'profile', essenceId: id}
        return this.fileService.createFile(payload, image)
    }

    async unlinkImage(id) {
        return await this.fileService.unlinkFile(id)
    }
}
