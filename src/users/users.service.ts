import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDTO } from './users.dto';
import { PrismaService } from '../database/prisma.service'
import { IUsers } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async create(users: UsersDTO): Promise<IUsers>{
        const hashPassword = await bcrypt.hash(users.password, 10);
        return await this.prisma.users.create({data: {...users, password: hashPassword},});
    }

    async findAll(): Promise<IUsers[]> {
        const users = await this.prisma.users.findMany();  
        return users
    }

    async findByID(id: number): Promise<IUsers> {
        let number = parseInt(id.toString())
        const user = await this.prisma.users.findUnique({
            where: { id: number }
        });
    
        if (user) {
            return user
        }
    
        throw new NotFoundException("Usuário não encontrado");
    }

    async update(id: number, users: UsersDTO): Promise<IUsers>{
        let number = parseInt(id.toString())
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

    async delete(id: number): Promise<IUsers>{
        let number = parseInt(id.toString())
        return this.prisma.users.delete({
            where: {id: number},
        });
    }

    async findByUserName(username: string): Promise<UsersDTO | null> {
        return await this.prisma.users.findUnique({
            where: { name: username },
        });
    }
}