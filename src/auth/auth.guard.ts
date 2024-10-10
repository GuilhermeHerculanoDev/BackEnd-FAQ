import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  private jwtSecret: string

  constructor (private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtSecret
        }
      )

      request['user'] = payload
    }
    catch{
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request:Request): string | undefined{
    const authorizationHeader = request.headers['authorization']
    const [type, token] = authorizationHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined
  }
}
