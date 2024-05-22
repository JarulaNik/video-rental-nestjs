import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RentMovieDto } from './dto/rent-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiCreatedResponse({ type: CreateMovieDto }) // Используем DTO
    @ApiBearerAuth()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    @ApiOkResponse({ type: [CreateMovieDto] }) // Используем DTO
    findAll() {
        return this.moviesService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateMovieDto }) // Используем DTO
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/rent')
    @ApiCreatedResponse({ type: CreateMovieDto })
    @ApiBearerAuth()
    rentMovie(
      @Param('id') id: string,
      @Body() rentMovieDto: RentMovieDto,
      @Request() req,
    ) {
        rentMovieDto.movieId = id; // Добавьте movieId в rentMovieDto
        return this.moviesService.rentMovie(rentMovieDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOkResponse({ type: CreateMovieDto }) // Используем DTO
    @ApiBearerAuth()
    update(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ type: CreateMovieDto }) // Используем DTO
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.moviesService.delete(id);
    }
}