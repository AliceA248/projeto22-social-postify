import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MediaCreationRequest } from './dto/create.media';
import { UpdateMedia } from './dto/update.media';
import { Medias as MediaModel } from '@prisma/client';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: MediaCreationRequest): Promise<MediaModel> {
    const { title, username } = createMediaDto;

    try {
      const mediaEntity = new MediaEntity(title, username);
      return await this.prisma.medias.create({
        data: mediaEntity,
      });
    } catch (error) {
      if (error.message.includes('Media already exists')) {
        throw new ConflictException(error.message);
      }
      throw new NotFoundException(error.message);
    }
  }

  async findAll(): Promise<MediaModel[]> {
    return this.prisma.medias.findMany();
  }

  async findOneByUserName(username: string, title: string): Promise<MediaModel | null> {
    const result = await this.prisma.medias.findFirst({
      where: { username, title },
    });
    return result;
  }

  async findOne(id: number): Promise<MediaModel | null> {
    return this.prisma.medias.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMediaDto: UpdateMedia): Promise<MediaModel> {
    return this.prisma.medias.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  async checkforPublications(id: number) {
    return this.prisma.publications.findMany({
      where: { mediaId: id },
    });
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    if (!media) {
      throw new NotFoundException('Media not found');
    }

    const publications = await this.checkforPublications(id);
    if (publications.length > 0) {
      throw new ForbiddenException('There is a publication for this media');
    }

    await this.prisma.medias.delete({
      where: { id },
    });

    return { id };
  }
}
