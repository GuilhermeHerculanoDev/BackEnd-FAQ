import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, PrismaService],
  exports: [AnswersService]
})
export class AnswersModule {}
