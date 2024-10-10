import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnswerDTO } from './dtos/answers.dto';
import { AnswersService } from './answers.service';
import { IAnswers } from './interfaces/answers.interfaces';

@Controller('answers')
export class AnswersController {

    constructor (private AnswerService: AnswersService) {}

    @Post()
    create(@Body() answer: AnswerDTO): Promise<IAnswers> {
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

    @Patch('/:id')
    update(@Param('id') id:number, @Body() answer:AnswerDTO): Promise<IAnswers>{
        return this.AnswerService.update(id, answer)
    }

    @Delete('/:id')
    delete(@Param('id') id:number): Promise<IAnswers>{
        return this.AnswerService.delete(id)
    }
}
