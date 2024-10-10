import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionsDTO } from 'src/questions/dtos/create.questions.tdo'; 

export class UpdateQuestionsDto extends PartialType(CreateQuestionsDTO) {}