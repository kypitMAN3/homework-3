import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value:string) {
        return this.roleService.getRoleByValue(value)
    }
}
