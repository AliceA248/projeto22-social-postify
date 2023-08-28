import { HttpException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostRequest } from './dto/create.post';
import { UpdatePostDto } from './dto/update.post';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostRequest) {
    return this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    const publications = await this.postsRepository.checkforPublications(id);
    
    if (publications.length > 0) {
      throw new ForbiddenException('Cannot delete post with associated publications');
    }
    
    return this.postsRepository.remove(id);
  }
}
