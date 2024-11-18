import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDTO } from './dtos/create.users.dto';
import { PrismaService } from '../database/prisma.service'
import { IUsers } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update.users.dto';


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async create(users: CreateUsersDTO): Promise<IUsers>{
        const {name, email, password, description, telephone} = users

        const existingUser = await this.prisma.users.findFirst({
            where: {
                OR: [{ email }, { name }],
            },
        });
        if (existingUser) {
            throw new HttpException(
                `O ${existingUser.name === name ? 'nome' : 'email'} já está registrado`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(users.password, 10);

        const userData = {
            name,
            email,
            password: hashPassword,
            description,
            telephone,
            is_admin: users.is_admin || false,
        };

        return await this.prisma.users.create({data: userData});
    }

    async findAll(request): Promise<IUsers[]> {
        if (request.user.admin === true) {    
            return await this.prisma.users.findMany();  
        }
        throw new HttpException(
            'Usúario não autorizado',
            HttpStatus.BAD_REQUEST,
        );
    }

    async findByID(id: number, request): Promise<IUsers> {
            let number = parseInt(id.toString())
            const user = await this.prisma.users.findUnique({
                where: { id: number }
            });
        
            if (user) {
                return user
            
        }
        
            throw new NotFoundException("Usuário não encontrado");
    }

    async update(id: number, users: UpdateUserDto, request): Promise<IUsers> {
        if (!request.user) {
            throw new UnauthorizedException("Usuário não autenticado");
        }
    
        const userId = parseInt(id.toString(), 10);
    
        if (request.user.sub === userId || request.user.admin === true) {
            const { name, email, password, description, telephone, is_admin } = users;

            const existingUser = await this.prisma.users.findFirst({
                where: {
                    OR: [{ email }, { name }, {telephone}, {description}],
                },
            });
            if (existingUser) {
                const conflictField = existingUser.email === email? 'email'
                : existingUser.name === name
                ? 'name'
                : existingUser.telephone === telephone
                ? 'telephone'
                : 'description';
            
              throw new HttpException(
                `O ${conflictField} já está registrado`,
                HttpStatus.BAD_REQUEST,
              );
            }
    
            const userData: any = {
                name,
                email,
                description,
                telephone,
                is_admin: is_admin || false,
            };
    
            if (password) {
                userData.password = await bcrypt.hash(password, 10);
            }
    
            try {
                const updatedUser = await this.prisma.users.update({
                    where: { id: userId },
                    data: userData,
                });
                return updatedUser;
            } catch (error) {
                throw new NotFoundException('Usuário não encontrado');
            }
        }
    
        throw new UnauthorizedException("Seu usuário não pode editar");
    }
    

    async delete(id: number, request): Promise<IUsers>{
        if (request.user.admin === true || request.user.sub) {    
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

    async findByIDUser(id: number): Promise<CreateUsersDTO | null> {
        let number = parseInt(id.toString())
        const user = await this.prisma.users.findUnique({
            where: { id: number }
        });
    
        if (user) {
            return user
        
    }
    
        throw new NotFoundException("Usuário não encontrado");
}
}