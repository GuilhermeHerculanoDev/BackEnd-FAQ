import { IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDTO {
    @IsNotEmpty({message: "Já existe uma categoria com esse nome"})
    @Length(1,50, {message: "A categoria deve ter de 1 a 50 caracteres"})
    category_name: string
    category_description: string
    category_image?:Buffer
}