import { HttpException, Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { MediaCreationRequest } from './dto/create.media';
import { UpdateMedia } from './dto/update.media';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

  async create(createMediaDto: MediaCreationRequest) {
    const mediaExists = await this.mediasRepository.findOneByUserName(
      createMediaDto.username,
      createMediaDto.title,
    );

    if (mediaExists) {
      throw new ConflictException('Media already exists');
    }

    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findOne(id);

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMedia) {
    const existingMedia = await this.mediasRepository.findOne(id);

    if (!existingMedia) {
      throw new NotFoundException('Media not found');
    }

    if (!updateMediaDto.title) {
      updateMediaDto.title = existingMedia.title;
    }

    if (updateMediaDto.username && existingMedia.username !== updateMediaDto.username) {
      updateMediaDto.username = `http://www.${updateMediaDto.title}.com/${updateMediaDto.username}`;
    }

    return this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    const media = await this.mediasRepository.findOne(id);

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    const publications = await this.mediasRepository.checkforPublications(id);

    if (publications.length > 0) {
      throw new ForbiddenException('There is a publication for this media');
    }

    return await this.mediasRepository.remove(id);
  }
}
