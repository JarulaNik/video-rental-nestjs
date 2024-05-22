import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { PrismaClient } from '@prisma/client';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..'), // Путь к директории с файлами
    }),
  ],
  controllers: [PicturesController],
  providers: [PicturesService, PrismaClient],
  exports: [PicturesService], // <-- Add this line to export the service
})
export class PicturesModule {}