import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOkResponse({ type: [CreateUserDto] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateUserDto })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne({ id });
    }

    @Patch(':id')
    @ApiOkResponse({ type: CreateUserDto })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update({ id }, updateUserDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateUserDto })
    remove(@Param('id') id: string) {
        return this.usersService.delete({ id });
    }
}