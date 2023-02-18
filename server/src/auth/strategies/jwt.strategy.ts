import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { IAccessJwtPayload } from '../types/access-jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersServices: UsersService) {
        super({
            jwtFromRequest: fromCookie,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: IAccessJwtPayload) {
        const user = await this.usersServices.findOne({ id: payload.sub });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}

function fromCookie(req: Request) {
    let token = null;
    if (req && req.cookies) token = req.cookies['access-jwt'];
    return token;
};