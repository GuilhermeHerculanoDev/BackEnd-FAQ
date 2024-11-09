import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuestionsDTO } from './dtos/create.questions.tdo';
import { IQuestions } from './interfaces/questions.interface';
import { UpdateQuestionsDto } from './dtos/update.questions.dto';

@Injectable()
export class QuestionsService {

    constructor (private prisma: PrismaService) {}

    async create(question:CreateQuestionsDTO): Promise<IQuestions>{
        return await this.prisma.questions.create({data: question});  
    }

    async findAll(): Promise<IQuestions[]>{
        return await this.prisma.questions.findMany()
    }

    async findByID(id: number): Promise<IQuestions> {
        let number = parseInt(id.toString())
        const user = await this.prisma.questions.findUnique({
            where: { id: number },
            select: {
                id:true,
                user:{
                    select:{
                        name:true
                    } 
                },
                users_id: true,
                category_id: true,
                title: true,
                description: true,
                date:true
            }
        });
        
        if (user) {
            return user
        }
    }

    async findByCategoryQuestions(id: number): Promise<IQuestions[]> {
        const number = parseInt(id.toString())
        const questions = await this.prisma.questions.findMany({
            where: { category_id: number },
            select: {
                id:true,
                user:{
                    select:{
                        name:true
                    } 
                },
                users_id: true,
                category_id: true,
                title: true,
                description: true,
                date:true
            }
        });

        if (questions.length > 0) {
            return questions;
        }

        throw new NotFoundException("Nenhuma questão encontrada para essa categoria");
    }

    async findByQuestionsUser (id: number): Promise<IQuestions[]> {
        const number = parseInt(id.toString())
        const questions = await this.prisma.questions.findMany({
            where: { users_id: number },
            select: {
                id:true,
                user:{
                    select:{
                        name:true
                    } 
                },
                users_id: true,
                category_id: true,
                title: true,
                description: true,
                date:true
            }
        });

        if (questions.length > 0) {
            return questions;
        }

        throw new NotFoundException("Nenhuma questão encontrada para essa categoria");
    }

    async update(id: number, users: UpdateQuestionsDto, request): Promise<IQuestions>{
        if (!request.user) {
            throw new UnauthorizedException("Usuário não autenticado");
          }
        let number = parseInt(id.toString())
        if (request.user.id === number || request.user.admin === true){
            try {
                const updatedUser = await this.prisma.questions.update({
                    where: { id:number },
                    data: users,
                });
                return updatedUser;
            } catch (error) {
                throw new NotFoundException('Usuário não encontrado');
            }
        }
        throw new UnauthorizedException("Seu usuario não pode editar")
    }
    
    async delete(id: number, request): Promise<IQuestions>{
        let number = parseInt(id.toString())
        if (request.user.admin === true || request.user.id === number) {    
            return this.prisma.questions.delete({
                where: {id: number},
            });
        }
        throw new UnauthorizedException("Seu usuario não pode excluir tarefas")
    }
}