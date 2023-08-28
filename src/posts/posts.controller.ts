import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequest } from './dto/create.post';
import { UpdatePostDto } from './dto/update.post';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostRequest) {
    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.postsService.findOne(+id);
    } catch (error) {
      if (error.message === 'Post not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.update(+id, updatePostDto);
    } catch (error) {
      if (error.message === 'Post not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.postsService.remove(+id);
    } catch (error) {
      if (error.message === 'Post not found') {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 500);
    }
  }
}
