import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, userpass: string): Promise<User | null> {
        const user = await this.usersService.findOneAndSelectPassword(username);
        if (!user) return null;

        const isMatch = await compare(userpass, user.password);
        if (!isMatch) return null;

        return user;
    }

    async signin(user: User): Promise<string> {
        return this.jwtService.signAsync({ sub: user.id });
    }
}
