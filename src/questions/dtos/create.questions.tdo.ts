import { IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateQuestionsDTO{
    @IsNotEmpty({message: "O id do usuario não pode está vazio"})
    @IsNumber()
    users_id: number;

    @IsNotEmpty({message: "O id da categoria não pode está sozinho"})
    category_id: number;

    @IsNotEmpty({message: "O titulo não pode está vazio"})
    @Length(1, 50, {message: "O titulo deve ter entre 1 a 50 caracteres"})
    title: string;

    @IsNotEmpty({message: "A descrição não pode está vazrio"})
    @Length(1, 200 , {message: "A descrição da questão deve ter entre 1 a 200 caracteres"})
    description: string;
}