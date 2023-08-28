import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreatePostRequest } from './dto/create.post';
import { UpdatePostDto } from './dto/update.post';
import { PrismaService } from '../prisma/prisma.service';
import { Posts as PostModel } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostRequest): Promise<PostModel> {
    return await this.prisma.posts.create({
      data: createPostDto,
    });
  }

  async findAll(): Promise<PostModel[]> {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: number): Promise<PostModel | null> {
    return await this.prisma.posts.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostModel> {
    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number): Promise<void> {
    const existingPost = await this.findOne(id);

    if (!existingPost) {
      throw new NotFoundException('Post not found');
    }

    const publications = await this.checkforPublications(id);
    if (publications.length > 0) {
      throw new ConflictException('Cannot delete post with associated publications');
    }

    await this.prisma.posts.delete({
      where: { id },
    });
  }

  async checkforPublications(id: number) {
    return await this.prisma.publications.findMany({
      where: { postId: id },
    });
  }
}
