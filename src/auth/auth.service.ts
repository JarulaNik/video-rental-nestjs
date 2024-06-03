import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto): Promise<{ accessToken: string }> {
        const { email, password } = signupDto; // Удалили Role
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new UnauthorizedException('Пользователь с таким email уже существует');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            email,
            password: hashedPassword,
        });
        const payload = { email: user.email, sub: user.id, Role: 'User' };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Неверный email или пароль');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный email или пароль');
        }
        const payload = { email: user.email, sub: user.id, Role: user.Role };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}