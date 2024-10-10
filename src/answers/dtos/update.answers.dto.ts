import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDTO } from './create.answers.dto'; 

export class UpdateAnswersDto extends PartialType(CreateAnswerDTO) {}