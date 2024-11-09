import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAnswerDTO } from './dtos/create.answers.dto';
import { IAnswers } from './interfaces/answers.interfaces';
import { UpdateAnswerDTO } from './dtos/update.answer.dto';

@Injectable()
export class AnswersService {
    
    constructor (private prisma: PrismaService) {}

    create(answer:CreateAnswerDTO): Promise<IAnswers>{
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

    async findByAnswers(id: number): Promise<IAnswers[]> {
        const number = parseInt(id.toString())
        const answers = await this.prisma.answers.findMany({
            where: { question_id: number },
            select: {
                id:true,
                user:{
                    select:{
                        name:true
                    } 
                },
                users_id: true,
                question_id: true,
                answer:true,
                date:true
            }
        });

        if (answers.length > 0) {
            return answers;
        }

        throw new NotFoundException("Nenhuma resposta foi encontrada encontrada para essa categoria");
    }

    async findByAnswersUser (id: number): Promise<IAnswers[]> {
        const number = parseInt(id.toString())
        const answers = await this.prisma.answers.findMany({
            where: { users_id: number },
            select: {
                id:true,
                user:{
                    select:{
                        name:true
                    } 
                },
                users_id: true,
                question_id: true,
                answer:true,
                date:true
            }
        });

        if (answers.length > 0) {
            return answers;
        }

        throw new NotFoundException("Nenhuma resposta foi encontrada encontrada para essa categoria");
    }

    async update(id:number, answer:UpdateAnswerDTO, request): Promise<IAnswers>{
        let number = parseInt(id.toString())
        if (request.user.id === number || request.users.admin === true){
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
        throw new NotFoundException('Resposta não pode ser editada');
    }

    delete(id:number, request): Promise<IAnswers>{
        let number = parseInt(id.toString())
        if (request.user.id === number || request.user.admin == true){
            return this.prisma.answers.delete({
                where: {id:number}
            })
        }
        throw new NotFoundException('Resposta não pode ser deletada');
    }
    
}
