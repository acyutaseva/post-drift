import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from '../graphql/post.resolver';
import { Post } from './post.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostSeeder } from '../seeder/post.seeder';

@Module({
    imports: [
        MikroOrmModule.forFeature([Post]),
    ],

  providers: [PostService, PostResolver, PostSeeder],
  exports: [PostService, PostSeeder], 
})
export class PostModule {}
