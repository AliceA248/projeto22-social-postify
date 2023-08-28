import { HttpException, Injectable } from '@nestjs/common';
import { CreatePublication } from './dto/create.publication';
import { UpdatePublication } from './dto/update.publication';
import { PrismaService } from '../prisma/prisma.service';
import { Publications as PublicationModel } from '@prisma/client';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublication): Promise<PublicationModel> {
    const newPublication = await this.prisma.publications.create({
      data: createPublicationDto,
    });
    return newPublication;
  }

  async findAll(): Promise<PublicationModel[]> {
    const publications = await this.prisma.publications.findMany();
    return publications;
  }

  async findOne(id: number): Promise<PublicationModel> {
    const publication = await this.prisma.publications.findUnique({
      where: { id },
    });
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublication): Promise<PublicationModel> {
    const existingPublication = await this.findOne(id);
    if (!existingPublication) {
      throw new HttpException('Publication not found', 403);
    }

    if (existingPublication.date <= new Date()) {
      throw new HttpException('Publication already posted', 401);
    }

    const updatedPublication = await this.prisma.publications.update({
      where: { id },
      data: updatePublicationDto,
    });
    return updatedPublication;
  }

  async remove(id: number) {
    const existingPublication = await this.findOne(id);
    if (!existingPublication) {
      throw new HttpException('Publication not found', 404);
    }
    await this.prisma.publications.delete({
      where: { id },
    });
  }

  async checkPosts(id: number) {
    const post = await this.prisma.posts.findFirst({
      where: { id },
    });
    return post;
  }

  async checkMedias(id: number) {
    const media = await this.prisma.medias.findFirst({
      where: { id },
    });
    return media;
  }
}
