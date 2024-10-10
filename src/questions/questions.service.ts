import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { QuestionsDTO } from './dtos/questions.tdo';
import { IQuestions } from './interfaces/questions.interface';

@Injectable()
export class QuestionsService {

    constructor (private prisma: PrismaService) {}

    create(question:QuestionsDTO): Promise<IQuestions>{
        return this.prisma.questions.create({data:question})
    }

    findAll(): Promise<IQuestions[]>{
        return this.prisma.questions.findMany()
    }

    async findById(id:number): Promise<IQuestions> {
        let numberId = parseInt(id.toString())
        const question = await this.prisma.questions.findUnique({
            where: {id:numberId}
        })
        if(question) {
            return question
        }
        throw new NotFoundException('Questão não encontrada');
    }

    async update(id:number, question:QuestionsDTO): Promise<IQuestions>{
        let number = parseInt(id.toString())
        try {
            const updatedQuestion = await this.prisma.questions.update({
                where: { id:number },
                data: question,
            });
            return updatedQuestion;
        } catch (error) {
            throw new NotFoundException('Questão não encontrada');
        }
    }
    
    delete(id:number): Promise<IQuestions>{
        let number = parseInt(id.toString())
        return this.prisma.questions.delete({
            where: {id: number}
        })
    }
}