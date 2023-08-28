import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create.publication';
import { UpdatePublicationDto } from './dto/update.publication';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const media = await this.publicationsRepository.checkMedias(createPublicationDto.mediaId);
    if (!media) {
      throw new HttpException('Media not found', 404);
    }

    const post = await this.publicationsRepository.checkPosts(createPublicationDto.postId);
    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    const createdPublication = await this.publicationsRepository.create(createPublicationDto);
    return createdPublication;
  }

  async findAll() {
    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.publicationsRepository.findOne(id);
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const media = await this.publicationsRepository.checkMedias(updatePublicationDto.mediaId);
    if (!media) {
      throw new HttpException('Media not found', 404);
    }

    const post = await this.publicationsRepository.checkPosts(updatePublicationDto.postId);
    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    const existingPublication = await this.publicationsRepository.findOne(id);
    if (!existingPublication) {
      throw new HttpException('Publication not found', 404);
    }

    return await this.publicationsRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const existingPublication = await this.publicationsRepository.findOne(id);
    if (!existingPublication) {
      throw new HttpException('Publication not found', 404);
    }

    return await this.publicationsRepository.remove(id);
  }
}
