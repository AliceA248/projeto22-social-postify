import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
