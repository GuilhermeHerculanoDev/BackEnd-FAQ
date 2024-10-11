import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionsDTO } from './create.questions.tdo'; 

export class UpdateQuestionsDto extends PartialType(CreateQuestionsDTO) {}