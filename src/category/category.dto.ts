import { IsNotEmpty, Length } from "class-validator";

export class CategoryDTO {
    @IsNotEmpty({message: "Já existe uma categoria com esse nome"})
    @Length(1,50, {message: "A categoria deve ter de 1 a 50 caracteres"})
    category_name: string
}