import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsDTO } from './questions.tdo';
import { IQuestions } from './interfaces/questions.interface';

@Controller('questions')
export class QuestionsController {

    constructor (private QuestionsService: QuestionsService) {}

    @Post()
    create(@Body() question:QuestionsDTO): Promise<IQuestions>{
        return this.QuestionsService.create(question)
    }

    @Get()
    findAll(): Promise<IQuestions[]>{
        return this.QuestionsService.findAll()
    }

    @Get('/:id')
    finById(@Param('id') id:number): Promise<IQuestions>{
        return this.QuestionsService.findById(id)
    }

    @Patch('/:id')
    update(@Param('id') id:number, @Body() questions:QuestionsDTO): Promise<IQuestions>{
        return this.QuestionsService.update(id, questions)
    }

    @Delete('/:id')
    delete(@Param('id') id:number): Promise<IQuestions>{
        return this.QuestionsService.delete(id)
    }
}
