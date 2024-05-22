import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PicturesService {
  constructor(private db: PrismaClient) {}

  async upload(data) {
    const file = data.image;
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const newFileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, newFileName);
    await fs.promises.writeFile(filePath, file.buffer);
    const fullFilePath = path.join(process.env.DOMAIN, filePath);
    const createdPicture = await this.db.pictures.create({
      data: {
        url: fullFilePath,
        tags: data.tags,
        description: data.description,
        path: filePath,
      },
    });
    return createdPicture;
  }

  async getAll(limit?: Number) {
    const takeLimit = limit !== undefined ? parseInt(limit.toString(), 10) : undefined;
    const allPictures = await this.db.pictures.findMany({
      take: takeLimit,
      where: {
        visibility: true,
      },
    });
    if (!allPictures || allPictures.length === 0) {
      throw new NotFoundException('Тут нихуя нету');
    }
    return allPictures;
  }

  async get(tags: string) {
    if (!tags) {
      throw new BadRequestException('Тег не был отправлены');
    }
    const tagsPictures = await this.db.pictures.findMany({
      where: {
        tags: tags,
      },
    });
    if (!tagsPictures || tagsPictures.length === 0) {
      throw new NotFoundException('Тут нихуя нету');
    }
    return tagsPictures;
  }

  async update(picId: string, data) {
    const picture = await this.db.pictures.findUnique({
      where: {
        id: picId,
      },
    });
    if (!picture) {
      throw new NotFoundException('Такой картинки нету');
    }
    const updatedPicture = await this.db.pictures.update({
      where: {
        id: picId,
      },
      data: {
        tags: data.tags,
        description: data.description,
      },
    });
    return updatedPicture;
  }

  async delete(picId: string) {
    const picture = await this.db.pictures.findUnique({
      where: {
        id: picId,
      },
    });
    if (!picture) {
      throw new NotFoundException('Такой картинки нету');
    }
    await fs.unlink(picture.path, (err) => {
      if (err) {
        throw new BadRequestException('Ошибка удаления файла');
      }
    });
    const deletedPicture = await this.db.pictures.delete({
      where: {
        id: picId,
      },
    });
    return picture;
  }
}