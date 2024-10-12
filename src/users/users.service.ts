import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDTO } from './dtos/create.users.dto';
import { PrismaService } from '../database/prisma.service'
import { IUsers } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update.users.dto';


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async create(users: CreateUsersDTO): Promise<IUsers>{
        const hashPassword = await bcrypt.hash(users.password, 10);
        return await this.prisma.users.create({data: {...users, password: hashPassword},});
    }

    async findAll(request): Promise<IUsers[]> {
        if (request.user.admin === true) {    
            return await this.prisma.users.findMany();  
        }
        throw new UnauthorizedException("O usuario não tem permisão");
    }

    async findByID(id: number, request): Promise<IUsers> {
        if (request.user.admin === true) {    
            let number = parseInt(id.toString())
            const user = await this.prisma.users.findUnique({
                where: { id: number }
            });
        
            if (user) {
                return user
            }
        }
        
            throw new NotFoundException("Usuário não encontrado");
    }

    async update(id: number, users: UpdateUserDto, request): Promise<IUsers>{
        if (!request.user) {
            throw new UnauthorizedException("Usuário não autenticado");
          }
        let number = parseInt(id.toString())
        if (request.user.id === number || request.user.admin === true){
            try {
                const updatedUser = await this.prisma.users.update({
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

    async delete(id: number, request): Promise<IUsers>{
        if (request.user.admin === true || !request.user) {    
            let number = parseInt(id.toString())
            return this.prisma.users.delete({
                where: {id: number},
            });
        }
        throw new UnauthorizedException("Seu usuario não pode excluir tarefas")

    }

    async findByUserName(username: string): Promise<CreateUsersDTO | null> {
        return await this.prisma.users.findUnique({
            where: { name: username },
        });
    }
}