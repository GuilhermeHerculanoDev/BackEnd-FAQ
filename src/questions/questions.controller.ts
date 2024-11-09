import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionsDTO } from './dtos/create.questions.tdo';
import { IQuestions } from './interfaces/questions.interface';
import { UpdateQuestionsDto } from './dtos/update.questions.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('questions')
@UseGuards(AuthGuard)
export class QuestionsController {

    constructor (private QuestionsService: QuestionsService) {}

    @Post()
    create(@Body() question:CreateQuestionsDTO): Promise<IQuestions>{
        return this.QuestionsService.create(question)
    }

    @Get()
    findAll(): Promise<IQuestions[]>{
        return this.QuestionsService.findAll()
    }

    @Get('/:id')
    finById(@Param('id') id:number): Promise<IQuestions>{
        return this.QuestionsService.findByID(id)
    }

    @Get('/searchQuestions/:category_id')
    findByCategoryQuestions(@Param('category_id') category_id:number): Promise<IQuestions[]>{
        return this.QuestionsService.findByCategoryQuestions(category_id)
    }

    @Get('/searchQuestionsUser/:id')
    findByQuestionsUser(@Param('id') id:number): Promise<IQuestions[]>{
        return this.QuestionsService.findByQuestionsUser(id)
    }

    @Patch('/:id')
    update(@Param('id') id:number, @Body() questions:UpdateQuestionsDto, @Request() request): Promise<IQuestions>{
        return this.QuestionsService.update(id, questions, request)
    }

    @Delete('/:id')
    delete(@Param('id') id:number, @Request() request): Promise<IQuestions>{
        return this.QuestionsService.delete(id, request)
    }
}
