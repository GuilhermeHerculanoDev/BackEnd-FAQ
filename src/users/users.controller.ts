import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersDTO } from './dtos/users.dto';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface';

@Controller('users')
export class UsersController {

    constructor (private UsersService: UsersService) {}

    @Post()
    async create(@Body() users: UsersDTO): Promise<IUsers>{
        return this.UsersService.create(users)
    }

    @Get()
    findAll(): Promise<IUsers[]>{
        return this.UsersService.findAll()
    }

    @Get('/:id')
    findById(@Param('id') id:number): Promise<IUsers>{
        return this.UsersService.findByID(id)
    }

    @Patch('/:id')
    update(@Param('id') id:number, @Body() users: UsersDTO): Promise<IUsers>{
        return this.UsersService.update(id, users)
    }


    @Delete('/:id')
    delete(@Param('id') id:number): Promise<IUsers>{
        return this.UsersService.delete(id)
    }
}