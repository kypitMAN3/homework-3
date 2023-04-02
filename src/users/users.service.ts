import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, 
                private roleService: RolesService, private authService: AuthService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAll() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)

        if(role && user) {
            await user.$add('role', role.id)
            return dto
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.authService.generateTokens(user)
        await this.authService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user}
    }

    async validateUser(dto: CreateUserDto) {
        const user = await this.getUserByEmail(dto.email)                           // находим юзера
        const passwordEquals = await bcrypt.compare(dto.password, user.password)    // сравниваем введенный пароль и сохраненный хэш

        if (user && passwordEquals) {
            return user
        }

        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}