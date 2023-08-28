import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpCode, Put } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create.publication';
import { UpdatePublicationDto } from './dto/update.publication';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      const newPublication = await this.publicationsService.create(createPublicationDto);
      return { message: 'Publication created', publication: newPublication };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      const publications = await this.publicationsService.findAll();
      return publications;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const publication = await this.publicationsService.findOne(+id);
      return publication;
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    try {
      const updatedPublication = await this.publicationsService.update(+id, updatePublicationDto);
      return { message: 'Publication updated', publication: updatedPublication };
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.publicationsService.remove(+id);
      return { message: 'Publication deleted', id };
    } catch (error) {
      if (error.message === 'Publication not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
