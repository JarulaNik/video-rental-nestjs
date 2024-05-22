import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
}