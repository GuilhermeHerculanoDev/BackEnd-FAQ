import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateAnswerDTO } from './dtos/create.answers.dto';
import { AnswersService } from './answers.service';
import { IAnswers } from './interfaces/answers.interfaces';
import { UpdateAnswerDTO } from './dtos/update.answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('answers')
@UseGuards(AuthGuard)
export class AnswersController {

    constructor (private AnswerService: AnswersService) {}

    @Post()
    create(@Body() answer: CreateAnswerDTO): Promise<IAnswers> {
        return this.AnswerService.create(answer)
    }

    @Get()
    findAll(): Promise<IAnswers[]>{
        return this.AnswerService.findAll()
    }

    @Get('/:id')
    findById(@Param('id') id:number): Promise<IAnswers>{
        return this.AnswerService.findById(id)
    }

    @Get('/searchAnswers/:id')
    findByAnswers(@Param('id') questions_id:number): Promise<IAnswers[]>{
        return this.AnswerService.findByAnswers(questions_id)
    }

    @Get('/searchQuestionsUser/:id')
    findByAnswersUser(@Param('id') id:number): Promise<IAnswers[]>{
        return this.AnswerService.findByAnswersUser(id)
    }

    @Patch('/:id')
    update(@Param('id') id:number, @Body() answer:UpdateAnswerDTO, @Request() request): Promise<IAnswers>{
        return this.AnswerService.update(id, answer, request)
    }

    @Delete('/:id')
    delete(@Param('id') id:number, @Request() request): Promise<IAnswers>{
        return this.AnswerService.delete(id, request)
    }
}
