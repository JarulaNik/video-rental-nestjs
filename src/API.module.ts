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
    customCssUrl: './swagger.css',
    customfavIcon: './favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: true,
      filter: true,
      docExpansion: 'none',
      showRequestDuration: true,
      showExtensions: true,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      url: 'http://localhost:3000/api/api-docs',
    },
  });
}