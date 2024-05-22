import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}