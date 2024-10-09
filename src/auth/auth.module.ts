import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: +configService.get<string>('JWT_EXPIRATION_TIME')}
    }),
    inject: [ConfigService]
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  exports: [AuthModule]
})
export class AuthModule {}
