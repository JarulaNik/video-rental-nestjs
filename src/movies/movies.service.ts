import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Movie, Prisma, RentedMovie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { RentMovieDto } from './dto/rent-movie.dto';
import { User } from '@prisma/client';
import { UpdateMovieDto } from "./dto/update-movie.dto";
@Injectable()
export class MoviesService {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateMovieDto): Promise<Movie> {
        return this.prisma.movie.create({
            data,
        });
    }

    async findAll(): Promise<Movie[]> {
        return this.prisma.movie.findMany();
    }

    async findOne(id: string): Promise<Movie | null> {
        return this.prisma.movie.findUnique({
            where: { id },
        });
    }

    async rentMovie(rentMovieDto: RentMovieDto, user: User): Promise<RentedMovie> {
        const { movieId, rentalPeriod } = rentMovieDto;
        const rentalEndDate = this.calculateRentalEndDate(rentalPeriod);

        // Проверяем, существует ли фильм
        const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
        if (!movie) {
            throw new Error('Movie not found');
        }

        // Проверяем, не арендован ли фильм уже этим пользователем
        const isAlreadyRented = await this.prisma.rentedMovie.findFirst({
            where: {
                userId: user.id,
                movieId,
                rentalEndDate: { gt: new Date() }, // Проверяем, не истекла ли аренда
            }
        });

        if (isAlreadyRented) {
            throw new Error('Movie is already rented by you');
        }

        return this.prisma.rentedMovie.create({
            data: {
                userId: user.id,
                movieId,
                rentalEndDate,
            },
        });
    }

    private calculateRentalEndDate(rentalPeriod: string): Date | null {
        const now = new Date();
        switch (rentalPeriod) {
            case '24h':
                now.setDate(now.getDate() + 1);
                return now;
            case '7d':
                now.setDate(now.getDate() + 7);
                return now;
            case '1m':
                now.setMonth(now.getMonth() + 1);
                return now;
            case 'lifetime':
                return null;
            default:
                throw new Error('Invalid rental period');
        }
    }

    async update(id: string, data: UpdateMovieDto): Promise<Movie> {
        return this.prisma.movie.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Movie> {
        return this.prisma.movie.delete({
            where: { id },
        });
    }
}