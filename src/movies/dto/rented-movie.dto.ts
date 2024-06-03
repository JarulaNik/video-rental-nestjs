import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RentedMovieDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  rentalEndDate: Date | null;

  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;

  @ApiProperty({ type: CreateMovieDto })
  movie: CreateMovieDto;
}