// src/post/post.resolver.ts

import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.entity';
import {GraphQLResolveInfo} from 'graphql'; 


@Resolver( () => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [  Post])
  async posts(@Info() info?: GraphQLResolveInfo):Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post)
  async post(@Args('id') id: number): Promise<Post | null> {
    return this.postService.findById(id);
  }

  // @Mutation(() => Post)
  // async createPost(@Args('input') input: Partial<Post>): Promise<Post> {
  //   return this.postService.create(input);
  // }

  // @Mutation(() => Post)
  // async updatePost(@Args('id') id: number, @Args('input') input: Partial<Post>): Promise<Post | null> {
  //   return this.postService.update(id, input);
  // }

  // @Mutation(() => Post)
  // async deletePost(@Args('id') id: number): Promise<boolean> {
  //   return this.postService.delete(id);
  // }
}
