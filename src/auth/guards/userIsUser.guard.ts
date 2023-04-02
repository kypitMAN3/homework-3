import { Injectable, CanActivate, Inject, forwardRef, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";


@Injectable()
export class UserIsUserGuard implements CanActivate{

    constructor(private userService: UsersService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const params = request.params;
        const user = request.user;

        let hasPermission = false
        if (user.id === params.id) {
            hasPermission = true
        }

        return user && hasPermission
    }


}