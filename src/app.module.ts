import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { AnswersController } from './answers/answers.controller';
import { AnswersModule } from './answers/answers.module';


@Module({
  imports: [UsersModule, CategoryModule, QuestionsModule, AnswersModule],
  controllers: [AppController, QuestionsController, AnswersController],
  providers: [AppService],
})
export class AppModule {}
