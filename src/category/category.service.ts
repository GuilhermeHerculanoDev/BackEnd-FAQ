import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDTO } from './dtos/create.category.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dtos/update.category.dto';

@Injectable()
export class CategoryService {

    constructor (private prisma: PrismaService) {}

    async create(category: CreateCategoryDTO, response): Promise<Category>{
        if(response.user.admin === true){
            const namecategory = this.prisma.category.create({data:category});
            return namecategory
        }
        throw new UnauthorizedException("Somente administradores podem criar categorias");
    }

    findAll(response): Promise<Category[]>{
            return this.prisma.category.findMany()
    }

    async findByID(id:number): Promise<Category> {
        let number = parseInt(id.toString())
        const category = await this.prisma.category.findUnique({
            where: { id: number }
        });

        if (category){
            return category
        }

        throw new NotFoundException("Categoria não encontrada");
    }

    async update(id:number, category:UpdateCategoryDto, response): Promise<Category>{
        if (response.user.admin === true){
            let number = parseInt(id.toString())
            try {
                const updatedQuestion = await this.prisma.category.update({
                    where: { id:number },
                    data: category,
                });
                return updatedQuestion;
            } catch (error) {
                throw new NotFoundException('Categoria não encontrada');
            }
        }
    }

    delete(id:number, response): Promise<Category>{
        if(response.user.admin){
            let numberId = parseInt(id.toString())
            return this.prisma.category.delete({
                where: {id: numberId},
            });
        }
    }
}
