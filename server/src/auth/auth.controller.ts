import { Body, ConflictException, Controller, Post, UseGuards, Res, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { Role } from 'src/users/enums/role.enum';
import { ICommonResponseBody } from '../types/interfaces/common-response-body.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<ICommonResponseBody> {
        const user = await this.usersService.findOne({ username: signupDto.username });
        if (user) throw new ConflictException('Даний username уже використовується')

        await this.usersService.create(signupDto);
        return { message: 'Реєстрація успішна' };
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signin(
        @Res({ passthrough: true }) res: Response,
        @UserDecorator() user: User
    ): Promise<ICommonResponseBody> {
        const accessJwt = await this.authService.signin(user);

        res.cookie(
            'access-jwt',
            accessJwt,
            { httpOnly: true }
        );

        return {
            message: `Вхід успішний. Ласкаво просимо, ${ user.username }. Ваша роль – ${ user.role }`,
            data: { user }
        };
    }

    @Auth(Role.Admin)
    @Get('for-admins')
    forAdmin(): ICommonResponseBody {
        return { message: 'Маршрут для адміністраторів' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('for-all')
    forAll(): ICommonResponseBody {
        return { message: 'Маршрут для всіх авторизованих' };
    }
}
