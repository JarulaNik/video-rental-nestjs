import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class RentMovieDto {
    @ApiProperty({
        description: 'ID фильма для аренды',
    })
    @IsUUID()
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: 'Период аренды',
        enum: ['24h', '7d', '1m', 'lifetime'],
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['24h', '7d', '1m', 'lifetime'])
    rentalPeriod: string;
}