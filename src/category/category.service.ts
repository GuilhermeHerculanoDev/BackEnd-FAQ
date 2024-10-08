import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryDTO } from './category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {

    constructor (private prisma: PrismaService) {}

    async create(category: CategoryDTO): Promise<Category>{
        const namecategory = this.prisma.category.create({data:category});
        return namecategory
    }

    findAll(): Promise<Category[]>{
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

    async update(id:number, category:CategoryDTO): Promise<Category>{
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

    delete(id:number): Promise<Category>{
        let numberId = parseInt(id.toString())
        return this.prisma.category.delete({
            where: {id: numberId},
        });
    }
}
