import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchMovieDto {
  @ApiProperty({
    description: 'Ключевое слово для поиска',
    required: false,
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({
    description: 'Жанр фильма',
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    description: 'Год выпуска фильма',
    required: false,
  })
  @IsOptional()
  @IsString()
  releaseYear?: string;
}