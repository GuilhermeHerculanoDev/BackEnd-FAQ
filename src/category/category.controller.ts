import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dtos/create.category.dto';
import { ICategory } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dtos/update.category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
    constructor (private CategoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@Body() category: CreateCategoryDTO, @Request() reponse, @UploadedFile() file: Express.Multer.File): Promise<ICategory>{
        return this.CategoryService.create(category, reponse, file)
    }


    @Get()
    findAll(@Request() request): Promise<ICategory[]>{
        return this.CategoryService.findAll(request)
    }


    @Get('/:id')
    findById(@Param('id') id:number): Promise<ICategory>{
        return this.CategoryService.findByID(id)
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    update(@Param('id') id:number, @Body() category: UpdateCategoryDto, @Request() request): Promise<ICategory>{
        return this.CategoryService.update(id, category, request)
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    delete(@Param('id') id:number, @Request() request): Promise<ICategory>{
        return this.CategoryService.delete(id, request)
    }
}
