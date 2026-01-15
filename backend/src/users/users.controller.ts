import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Solo ADmin puede listar usuarios
    @Get()
    @Roles("ADMIN")
    findAll() {
         return { ok: true, message: "Acceso consedido para vista de HR" }
    }

    @Post()
    @Roles("ADMIN")
    async create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser({
            email: dto.email,
            password: dto.password, // OJO: todavía está plano (lo arreglamos en el punto 2)
            role: dto.role,
        });
    }

    //HR y ADMIN pueden ver resumenes
    @Get('ht-view')
    @Roles("ADMIN", "HR")
    hrView() {
        return { ok: true, message: "Acceso consedido para vista de HR" };
    }
 }
