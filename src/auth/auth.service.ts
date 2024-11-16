import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDTO } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number

    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    async singIn(username: string, password: string): Promise<AuthDTO>{
        const foundUser = await this.usersService.findByUserName(username)

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)){
            throw new UnauthorizedException()
        }

        const payload = {sub: foundUser.id, username: foundUser.name, email: foundUser.email, description: foundUser.description, telephone: foundUser.telephone ,admin: foundUser.is_admin}
        const token = this.jwtService.sign(payload)
        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
    }

    async verifyPassword (id: number, password: string): Promise<string>{
        const foundUser = await this.usersService.findByIDUser(id)


        console.log(foundUser)

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)){
            throw new UnauthorizedException("Senha incorreta")
        }
        return "Edição feita com sucesso"
    }

}
