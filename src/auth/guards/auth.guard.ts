import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (private jwtService: JwtService) {}

    // функция определяет разрешен ли доступ, возрващает true | false 
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()                                         // получаем реквест из контекста

        try {
            // получаем массив заголовков, в которых находятся bearer и токен, сохраняем их в переменные
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User is not authorized'})
            }

            const user = this.jwtService.verify(token)                             // верифицируем токен
            req.user = user                                                        // добавляем юзера в реквест
            return true
        } catch (e) {
            throw new UnauthorizedException({message: 'User is not authorized'})
        }
    }
}