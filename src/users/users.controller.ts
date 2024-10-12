import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUsersDTO } from './dtos/create.users.dto';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface';
import { UpdateUserDto } from './dtos/update.users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor (private UsersService: UsersService) {}

    @Post()
    async create(@Body() users: CreateUsersDTO): Promise<IUsers>{
        return this.UsersService.create(users)
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() resquest): Promise<IUsers[]>{
        return this.UsersService.findAll(resquest)
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    findById(@Param('id') id:number, @Request() request): Promise<IUsers>{
        return this.UsersService.findByID(id, request)
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    update(@Param('id') id:number, @Body() users: UpdateUserDto, @Request() request): Promise<IUsers>{
        return this.UsersService.update(id, users, request)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    delete(@Param('id') id:number, @Request() request): Promise<IUsers>{
        return this.UsersService.delete(id, request)
    }
}