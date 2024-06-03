import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '941b8b52b214d2c6fe992761908ae8d2cb2eea4003833556b72a695c3628a45d',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findOne({ id: payload.sub });
        return { ...user, id: user.id };
    }
}