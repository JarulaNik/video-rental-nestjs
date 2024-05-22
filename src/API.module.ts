import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from 'prisma/prisma.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class APIModule {}

export function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Video Rental API')
    .setDescription('API for renting movies')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    // ... (дополнительные параметры)
    customSiteTitle: 'Video Rental API',
    customCssUrl: './swagger.css', // Если у вас есть кастомный CSS для Swagger
    customfavIcon: './favicon.ico', // Если у вас есть кастомный favicon
    swaggerOptions: {
      persistAuthorization: true, // Remember auth token
      displayOperationId: true, // Show operationId
      filter: true, // Filter operations
      docExpansion: 'none', // Collapse all operations
      showRequestDuration: true, // Show request duration
      showExtensions: true, // Show extensions
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'], // Support GET, POST, PUT, DELETE methods
      url: 'http://localhost:3000/api/api-docs', // URL of the Swagger document
      // ... (дополнительные параметры)
    },
    // ... (дополнительные параметры)
  });
}