import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SearchMovieDto } from './movies/dto/search-movie.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Video Rental API')
    .setDescription('API for renting movies')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('movies', 'Movies related endpoints')
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  extraModels: [SearchMovieDto];
  await app.listen(3000);
}
bootstrap();
console.log(
  `Server is running on http://localhost:${process.env.API_PORT || 3000}/api-docs`, // Исправлено: /api-docs вместо /api
);