import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/create.category.dto';
import { ICategory } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dtos/update.category.dto';

@Controller('category')
export class CategoryController {
    constructor (private CategoryService: CategoryService) {}

    @Post()
    async create(@Body() category: CreateCategoryDTO): Promise<ICategory>{
        return this.CategoryService.create(category)
    }


    @Get()
    findAll(): Promise<ICategory[]>{
        return this.CategoryService.findAll()
    }


    @Get('/:id')
    findById(@Param('id') id:number): Promise<ICategory>{
        return this.CategoryService.findByID(id)
    }


    @Patch('/:id')
    update(@Param('id') id:number, @Body() category: UpdateCategoryDto): Promise<ICategory>{
        return this.CategoryService.update(id, category)
    }


    @Delete('/:id')
    delete(@Param('id') id:number): Promise<ICategory>{
        return this.CategoryService.delete(id)
    }
}
