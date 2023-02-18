import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
            useFactory() {
                return {
                    type: 'mysql',
                    host: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'root',
                    database: 'auth-app',
                    entities: [User],
                    synchronize: true
                }
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
