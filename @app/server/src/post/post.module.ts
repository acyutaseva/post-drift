import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from '../graphql/post.resolver';
import { Post } from './post.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostSeeder } from '../seeder/post.seeder';
import { PubSubModule } from 'src/pubSub.module';

@Module({
  imports: [MikroOrmModule.forFeature([Post]), PubSubModule],

  providers: [PostService, PostResolver, PostSeeder],
  exports: [PostService, PostSeeder],
})
export class PostModule {}
