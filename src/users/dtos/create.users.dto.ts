import { IsEmail, IsNotEmpty, Length, Max, Min } from "class-validator";

export class CreateUsersDTO {
    id?: number;
    @IsNotEmpty({message:"O nome não pode está vazio"})
    @Length(1,50, {message: "O nome precisa entre 1 a 50 caracteres"})
    name: string;
    
    @IsNotEmpty({message:"O email não pode está vazio"})
    @IsEmail({}, {message: "O email deve ser um email"})
    email: string;
    
    @IsNotEmpty({message: "A senha não pode está vazia"})
    @Length(1,30, {message: "A senha deve ter 1 a 30 caracteres"})
    password: string;

    description?: string;

    telephone?: string;

    is_admin?: boolean;
}