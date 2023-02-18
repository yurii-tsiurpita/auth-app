import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(signupDto: SignupDto): Promise<void> {
        const createdUser = this.usersRepository.create(signupDto);
        await this.usersRepository.save(createdUser);
    }

    async findOne(where: Record<string, any>): Promise<User | null> {
        return await this.usersRepository.findOne({ where });
    }

    async findOneAndSelectPassword(username: string): Promise<User | null> {
        return await this.usersRepository
            .createQueryBuilder()
            .where('User.username = :username', { username })
            .addSelect('User.password')
            .getOne();
        }
}
