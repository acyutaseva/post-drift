// src/post/post.resolver.ts

import { Resolver, Query, Mutation, Args, Info, Int } from '@nestjs/graphql';
import { PostService } from '../post/post.service';
import { Post, UpdatePostInput } from '../post/post.entity';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(
    @Args('offset', { type: () => Int }) offset: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Post[]> {
    return this.postService.findAll(offset, limit);
  }

  @Query(() => Post)
  async post(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Post | null> {
    return this.postService.findById(id);
  }

  // @Mutation(() => Post)
  // async createPost(@Args('input') input: Partial<Post>): Promise<Post> {
  //   return this.postService.create(input);
  // }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePostInput,
  ): Promise<Post | null> {
    return this.postService.update(id, input);
  }

  @Mutation(() => [Post])
  async updatePostPosition(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePostInput,
  ): Promise<Post> {
    return await this.postService.update(id, input);
  }

  // @Mutation(() => Post)
  // async deletePost(@Args('id') id: number): Promise<boolean> {
  //   return this.postService.delete(id);
  // }
}
