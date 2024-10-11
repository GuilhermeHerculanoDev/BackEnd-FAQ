import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDTO } from './create.answers.dto';

export class UpdateAnswerDTO extends PartialType(CreateAnswerDTO) {}