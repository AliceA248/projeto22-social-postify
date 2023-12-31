import { Controller, Get, Post, Body, Param, Delete, HttpException, Put, HttpCode, ValidationPipe } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediaCreationRequest } from './dto/create.media';
import { UpdateMedia } from './dto/update.media';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body(new ValidationPipe()) createMediaDto: MediaCreationRequest) {
    try {
      return this.mediasService.create(createMediaDto);
    } catch (error) {
      if (error.message === 'Media already exists') {
        throw new HttpException(error.message, 409);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    return await this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mediasService.findOne(+id);
    } catch (error) {
      if (error.message === 'Media not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateMediaDto: UpdateMedia) {
    try {
      return this.mediasService.update(+id, updateMediaDto);
    } catch (error) {
      if (error.message === 'Media not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.mediasService.remove(+id);
      return {
        statusCode: 204,
        id,
      };
    } catch (error) {
      if (error.message === 'Media not found') {
        throw new HttpException(error.message, 404);
      }
      if (error.message === 'There is a publication for this media') {
        throw new HttpException(error.message, 403);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
