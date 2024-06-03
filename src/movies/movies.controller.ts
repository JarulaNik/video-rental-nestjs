import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request, HttpException, HttpStatus, Logger, ParseUUIDPipe
} from "@nestjs/common";
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse, ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RentMovieDto } from './dto/rent-movie.dto';
import { Movie, RentedMovie } from "@prisma/client";
import { RentedMovieDto } from "./dto/rented-movie.dto";

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    private readonly logger = new Logger(MoviesController.name);
    constructor(private readonly moviesService: MoviesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiCreatedResponse({ type: CreateMovieDto })
    @ApiBearerAuth()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    @ApiOkResponse({ type: [CreateMovieDto] })
    findAll() {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Movie | null> {
        this.logger.debug(`findOne called with id: ${id}`);
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
        try {
            rentMovieDto.movieId = id;
            return this.moviesService.rentMovie(rentMovieDto, req.user);
        } catch (error) {
            console.error('Error renting movie:', error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOkResponse({ type: CreateMovieDto })
    @ApiBearerAuth()
    update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ type: CreateMovieDto })
    @ApiBearerAuth()
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.moviesService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('rented')
    @ApiResponse({
        status: 200,
        description: 'List of rented movies',
        type: [RentedMovieDto],
    })
    async getRentedMovies(@Request() req: any): Promise<RentedMovie[]> {
        console.log(req.user)
        const userId = await new ParseUUIDPipe().transform(req.user.id, { type: 'param' });
        return this.moviesService.getRentedMovies(userId);
    }
}
