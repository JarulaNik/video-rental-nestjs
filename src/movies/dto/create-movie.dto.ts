import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    genre: string;

    @ApiProperty()
    duration: number;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    releaseYear: number;

    @ApiProperty({
        type: 'object',
        properties: {
            '24h': { type: 'number' },
            '7d': { type: 'number' },
            '1m': { type: 'number' },
            lifetime: { type: 'number' },
        },
    })
    rentalPrice: {
        '24h': number;
        '7d': number;
        '1m': number;
        lifetime: number;
    };
}