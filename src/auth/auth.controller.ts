import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    singIn(@Body('username') username:string, @Body('password') password: string): Promise<AuthDTO>{
        return this.authService.singIn(username, password)
    }

    @Post('verifyPassword/:id')
    @HttpCode(HttpStatus.OK)
    verifyPassword(@Param('id') id:number, @Body('password') password:string): Promise<string>{
        return this.authService.verifyPassword(id, password)
    }
}
