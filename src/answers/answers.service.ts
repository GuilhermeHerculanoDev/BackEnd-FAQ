import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AnswerDTO } from './answers.dto';
import { IAnswers } from './interfaces/answers.interfaces';

@Injectable()
export class AnswersService {
    
    constructor (private prisma: PrismaService) {}

    create(answer:AnswerDTO): Promise<IAnswers>{
        return this.prisma.answers.create({data:answer})
    }

    findAll(): Promise<IAnswers[]>{
        return this.prisma.answers.findMany()

    }

    async findById(id:number): Promise<IAnswers>{
        let number = parseInt(id.toString())
        const answer = await this.prisma.answers.findUnique({
            where: {id:number}
        }) 

        if (answer) {
            return answer
        }

        throw new NotFoundException("Resposta não encontrada");
    }

    async update(id:number, answer:AnswerDTO): Promise<IAnswers>{
        let number = parseInt(id.toString())
        try {
            const updatedAnswer = await this.prisma.answers.update({
                where: { id:number },
                data: answer,
            });
            return updatedAnswer;
        } catch (error) {
            throw new NotFoundException('Resposta não encontrada');
        }
    }

    delete(id:number): Promise<IAnswers>{
        let number = parseInt(id.toString())
        return this.prisma.answers.delete({
            where: {id:number}
        })
    }
}
