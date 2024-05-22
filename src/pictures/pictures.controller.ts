import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PicturesService } from './pictures.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { fullPicturesDTO, picturesDTO, putPicturesDTO } from "./pictures.model";

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Загрузка новой картинки' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: picturesDTO })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Body() data: picturesDTO) {
    data.image = file;
    return await this.picturesService.upload(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Получение всех картинок' })
  @ApiOkResponse({ type: fullPicturesDTO, description: 'Все картинки' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  async getAllPictures(@Query() query: { limit?: number }) {
    const limit = query.limit;
    return await this.picturesService.getAll(limit);
  }

  @Get()
  @ApiOperation({ summary: 'Получение картинок по тегам' })
  @ApiOkResponse({ type: fullPicturesDTO, description: 'Все картинки по тегам' })
  @ApiQuery({ name: 'tags', required: true, type: String })
  async get(@Query() query: { tags: string }) {
    const tags = query.tags;
    return this.picturesService.get(tags);
  }

  @Put(':id')
  @ApiOkResponse({ type: fullPicturesDTO, description: 'Измененная картинка' })
  @ApiOperation({ summary: 'Изменение данных картинки' })
  @ApiParam({ name: 'id', type: String, description: 'ID картинки' })
  @ApiBody({ type: putPicturesDTO })
  async update(@Param('id') id: string, @Body() data: putPicturesDTO) {
    const picId = id;
    return this.picturesService.update(picId, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: fullPicturesDTO, description: 'Удаленная картинка' })
  @ApiOperation({ summary: 'Удаление картинки' })
  @ApiParam({ name: 'id', type: String, description: 'ID картинки' })
  async delete(@Param('id') id: string) {
    const picId = id;
    return this.picturesService.delete(picId);
  }
}