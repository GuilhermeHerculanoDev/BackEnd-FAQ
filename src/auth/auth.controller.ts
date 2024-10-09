import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('login')
    singIn(@Body('username') username:string, @Body('password') password: string): Promise<AuthDTO>{
        return this.authService.singIn(username, password)
    }
}
