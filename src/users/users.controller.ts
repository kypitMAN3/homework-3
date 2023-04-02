import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    // @UseGuards(AuthGuard)
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.userService.login(dto)
    }

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    // @UseGuards(AuthGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

}
