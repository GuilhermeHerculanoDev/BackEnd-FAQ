import { IsNotEmpty, IsNumber, Length } from "class-validator"

export class AnswerDTO {
    @IsNotEmpty({message: "O id do usuario não pode está vazio"})
    @IsNumber()
    users_id: number

    @IsNotEmpty({message: "O id da questão não pode está vazio"})
    @IsNumber()
    question_id: number

    @IsNotEmpty({message: "A resposta não pode está vazio"})
    @Length(1, 200, {message: "A resposta deve ter de 1 a 200 caracteres"})
    answer: string
}