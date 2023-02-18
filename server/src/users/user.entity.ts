import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Role } from './enums/role.enum';
import { hash } from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await hash(this.password, 12);
    }
}