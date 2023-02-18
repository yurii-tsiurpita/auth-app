import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err: any, user: any) {
        if (!user) throw new UnauthorizedException('Неправильний логін чи пароль. Спробуйте ще раз');
        return user;
    }
}