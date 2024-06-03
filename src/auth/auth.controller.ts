

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiCreatedResponse({
        description: 'Пользователь успешно зарегистрирован.',
    })
    signup(@Body() signupDto: SignupDto): Promise<{ accessToken: string }> {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    @ApiOkResponse({
        description: 'Пользователь успешно авторизован.',
    })
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Информация о профиле пользователя', type: User })
    async getProfile(@Request() req) {
        return req.user;
    }
}