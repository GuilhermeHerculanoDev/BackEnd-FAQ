import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/create.category.dto';
import { ICategory } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dtos/update.category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor (private CategoryService: CategoryService) {}

    @Post()
    async create(@Body() category: CreateCategoryDTO, @Request() reponse): Promise<ICategory>{
        return this.CategoryService.create(category, reponse)
    }


    @Get()
    findAll(@Request() request): Promise<ICategory[]>{
        return this.CategoryService.findAll(request)
    }


    @Get('/:id')
    findById(@Param('id') id:number): Promise<ICategory>{
        return this.CategoryService.findByID(id)
    }


    @Patch('/:id')
    update(@Param('id') id:number, @Body() category: UpdateCategoryDto, @Request() request): Promise<ICategory>{
        return this.CategoryService.update(id, category, request)
    }


    @Delete('/:id')
    delete(@Param('id') id:number, @Request() request): Promise<ICategory>{
        return this.CategoryService.delete(id, request)
    }
}
